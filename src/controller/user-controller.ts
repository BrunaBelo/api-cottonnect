import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { validateUser } from "../schema-validation/user-schema";
import { validateLogin } from "../schema-validation/login-schema";
import { getCustomRepository, getRepository } from "typeorm";
import { UserRepository } from "../repository/user-repository";
import { User } from "../model/user";
import { PasswordVerificationCode } from "../model/password-verification-code";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CreateUserService from "../service/user/create-user-service";
import LoginUserService from "../service/user/login-user-service";
import UpdateUserService from "../service/user/update-user-service";
import ValidateUserService from "../service/user/validate-user-service";
import Mailer from "../service/mailer/send-mailer";
import SendCondeVerification from "../service/twilio/send-code-verification";
import VerificationPhone from "../service/twilio/verification-phone";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      phoneNumber,
      cpf,
      phoneVerified,
      additionalInformation,
      cityId,
      roleId
    }:User = request.body;

    try {
      await validateUser(request.body);

      const user = await new CreateUserService({
        name,
        email,
        password,
        phoneNumber,
        cpf,
        phoneVerified,
        additionalInformation,
        cityId,
        roleId
      } as User).run();

      new Mailer(user.email, "Confirmação da conta", "Verifique seu email", "confirmation-account", {
        emailAddress: user.email,
        userName: user.name,
        confirmLink: `${process.env.APPLICATION_PATH}/confirmar-conta?userId=${user.id}`
      }).sendEmail();

      await new SendCondeVerification(user.phoneNumber).run();

      return response.status(201).json(user);
    } catch (error) {
      throw new AppError(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      await validateLogin(request.body);
    } catch (error) {
      throw new AppError(`Erro ao logar: ${error.message}`);
    }

    const user = await new LoginUserService(email, password).run();

    return response.status(200).json(user);
  }

  async validateUser(request: Request, response: Response): Promise<Response> {
    const { type, value, userId } = request.query;

    const user = await new ValidateUserService(type as string, value as string, userId as string).run();

    return response.status(200).json({result: user ? false : true});
  }

  async tokenRenewal(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(request.user.id);

    user.token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    return response.status(200).json({ token: user.token });
   }

  async getCottonFlakes(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    let cottonFlakes = 0;

    try {
      const user = await userRepository.findOne(request.user.id);
      cottonFlakes = user.cottonFlakes;
    } catch (error) {
      console.log("Erro ao buscar moedas", error);
    }

    return response.status(200).json({ cottonFlakes: cottonFlakes });
   }

   async findUser(request: Request, response: Response): Promise<Response> {
    const repository = getCustomRepository(UserRepository);
    const { id: userId } = request.params;
    let user = {} as User;

    try {
      user = await repository.findOne(userId as string, { relations: ['city']});
    } catch (error) {
      throw new AppError(`Usuário não encontrado: ${error.message}`);
    }

    return response.status(200).json(user);
  }

   async update(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.params;
    let user = {} as User;

    const userNewData = request.body;

    try {
      user = await new UpdateUserService(userId, userNewData).run();
    } catch (error) {
      throw new AppError(`Erro ao atualizar usuário: ${error.message}`);
    }

    return response.status(200).json(user);
  }

  async forgotPassword(request: Request, response: Response): Promise<Response> {
    const repository = getRepository(PasswordVerificationCode);
    const userRepository = getCustomRepository(UserRepository);
    const { email: userEmail } = request.params;

    try {
      const user = await userRepository.findOne({ where: { email: userEmail }});
      if(user == undefined){
        return response.status(422).json({ error: "Nenhum usuário encontrado com o e-mail informado. Confira seu e-mail."});
      }

      const code = Math.floor(Math.random()*16777215).toString(16);
      const object = repository.create({ code, userId: user.id });
      await repository.save(object);

      new Mailer(user.email, "Seu código de verificação", "Recuperar sua conta", "recouver-account", {
        emailAddress: user.email,
        userName: user.name,
        resetLink: `${process.env.APPLICATION_PATH}/alterar-senha?userId=${user.id}&code=${code}`
      }).sendEmail();

    } catch (error) {
      throw new AppError(`Erro ao gerar codigo de recuperação de conta ${error.message}`);
    }

    return response.status(200).json(true);
  }

  async changePassword(request: Request, response: Response): Promise<Response> {
    const repository = getCustomRepository(UserRepository);
    const codeRepository = getRepository(PasswordVerificationCode)
    const { password, userId, code } = request.body;

    try {
      const user = await repository.findOne(userId);
      const userCode = await codeRepository.findOne({ where: { userId: user.id, used: false }, order: { createdAt: 'DESC' }})

      if(code == userCode.code){
        await repository.update(user.id, { password: await bcrypt.hash(password, 10) });

        await codeRepository.update(userCode.id, { used: true });
      }else {
        throw new AppError(`Codigo invalido`);
      }
    } catch (error) {
      throw new AppError(`Erro ao mudar senha do usuário ${error}`);
    }

    return response.status(200).json(true);
  }

  async confirmAccount(request: Request, response: Response): Promise<Response> {
    const repository = getCustomRepository(UserRepository);
    const { id: userId } = request.query;

    try {
      const user = await repository.findOne({ where: { id: userId }});
      await repository.update(user.id, { confirmedEmail: true });
    } catch (error) {
      throw new AppError(`Erro ao confirmar conta do usuário ${error}`);
    }

    return response.status(200).json(true);
  }

  async confirmPhoneAccount(request: Request, response: Response): Promise<Response> {
    const repository = getCustomRepository(UserRepository);
    const { code, userId } = request.query;

    try {
      const user = await repository.findOne({ where: { id: userId }});
      const phoneNumber = user.phoneNumber;

      const confirmed = await new VerificationPhone(phoneNumber, code as string).run();

      if(confirmed == true){
        await repository.update(user.id, { phoneVerified: true });
      }else {
        return response.status(200).json(false);
      }
    } catch (error) {
      throw new AppError(`Erro ao confirmar conta do usuário ${error}`);
    }

    return response.status(200).json(true);
  }
}

export { UserController };
