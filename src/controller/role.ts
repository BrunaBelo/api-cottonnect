import { Request, Response } from "express";

import { RolesRepository } from "../repository/role";
import { RoleUseCase } from "../use-cases/roleUseCase";

class RoleController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const repository = new RolesRepository();
    const useCase = new RoleUseCase(repository);

    const newRole = await useCase.createRole(name);
    return response.status(201).json(newRole);
  }
}
export { RoleController };
