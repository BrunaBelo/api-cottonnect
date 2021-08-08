import { Request, Response } from "express";

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

    const useCase = new UserUseCase();
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
