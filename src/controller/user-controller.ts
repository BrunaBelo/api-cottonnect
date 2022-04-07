import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { validateUser } from "../schema-validation/user-schema";
import { validateLogin } from "../schema-validation/login-schema";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/user-repository";
import ValidateUserService from "../service/user/validate-user-service";
import CreateUserService from "../service/user/create-user-service";
import { User } from "../model/user";
import LoginUserService from "../service/user/login-user-service";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
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
      throw new AppError(`Erro ao criar usuário: ${error.errors}`);
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
}

export { UserController };
