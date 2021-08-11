import { Request, Response } from "express";

import { RoleUseCase } from "../use-cases/roleUseCase";

class RoleController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const useCase = new RoleUseCase();

    const newRole = await useCase.create(name);
    return response.status(201).json(newRole);
  }
}
export { RoleController };
