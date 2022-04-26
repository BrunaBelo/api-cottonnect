import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { validateUser } from "../schema-validation/user-schema";
import { validateLogin } from "../schema-validation/login-schema";
import { getCustomRepository, getRepository } from "typeorm";
import { UserRepository } from "../repository/user-repository";
import { User } from "../model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ValidateUserService from "../service/user/validate-user-service";
import CreateUserService from "../service/user/create-user-service";
import LoginUserService from "../service/user/login-user-service";
import UpdateUserService from "../service/user/update-user-service";
import { PasswordVerificationCode } from "../model/password-verification-code";

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
    const { type, value } = request.query;

    const user = await new ValidateUserService(type as string, value as string).run();


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
    const repository = getCustomRepository(UserRepository);
    const { id: userId } = request.params;
    let user = {} as User;

    const { userNewData } = request.body;

    try {
      user = await new UpdateUserService(userId, userNewData).run();
    } catch (error) {
      throw new AppError(`Erro ao atualizar usuário: ${error.message}`);
    }

    return response.status(200).json(user);
  }

  async forgotPassword(request: Request, response: Response): Promise<Response> {
    const repository = getRepository(PasswordVerificationCode)
    const { id: userId } = request.params;

    try {
      const code = Math.floor(Math.random()*16777215).toString(16);
      const object = repository.create({ code, userId });
      await repository.save(object);

       // mandar email
    } catch (error) {
      console.log(`Erro ao gerar codigo de recuperação de conta ${error.message}`);
    }

    return response.status(200).json();
  }

  async changePassword(request: Request, response: Response): Promise<Response> {
    const repository = getCustomRepository(UserRepository);
    const codeRepository = getRepository(PasswordVerificationCode)
    const { password, userId, code } = request.body;
    const userCode = await codeRepository.findOne({ where: { userId: userId, used: false }});

    if(code == userCode.code){
      const user = await repository.findOne(userId);
      await repository.update(user.id, { password: await bcrypt.hash(password, 10) });

      await codeRepository.update(userCode.id, { used: true });
    }else {
      throw new AppError(`Codigo invalido`);
    }

    return response.status(200).json();
  }
}

export { UserController };
