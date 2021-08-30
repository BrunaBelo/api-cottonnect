import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { User } from "../model/user";
import { validateUser } from "../schema-validation/user-schema";
import { UserUseCase } from "../use-cases/user-use-case";
import bcrypt from "bcryptjs";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const useCase = new UserUseCase();

    try {
      await validateUser(request.body);
    } catch (error) {
      throw new AppError(`Erro ao criar usuário: ${error.message}`);
    }

    const {
      name,
      email,
      password,
      phoneNumber,
      birthDay,
      phoneVerified,
      additionalInformation,
      cityId,
      roleId,
    } = request.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await useCase.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      phoneNumber,
      birthDay,
      phoneVerified,
      additionalInformation,
      cityId,
      roleId,
    });
    return response.status(201).json(user);
  }

  async login(request: Request, response: Response): Promise<Response> {
    const user = new User();
    return response.status(201).json(user);
  }
}

export { UserController };
