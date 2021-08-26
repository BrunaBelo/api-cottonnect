import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { User } from "../model/user";

import { UserUseCase } from "../use-cases/user-use-case";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const useCase = new UserUseCase();

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

    try {
    } catch (error) {
      throw new AppError("Erro ao criar usuário");
    }

    const user = await useCase.create({
      name,
      email,
      password,
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
