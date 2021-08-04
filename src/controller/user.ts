import { Request, Response } from "express";

import { UserRepository } from "../repository/user";
import { UserUseCase } from "../use-cases/userUseCase";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      phone_number,
      birth_day,
      phone_verified,
      additional_information,
      city_id,
      role_id,
    } = request.body;

    const repository = new UserRepository();
    const useCase = new UserUseCase(repository);
    const user = await useCase.create({
      name,
      email,
      password,
      phone_number,
      birth_day,
      phone_verified,
      additional_information,
      city_id,
      role_id,
    });
    return response.status(201).json(user);
  }
}

export { UserController };
