import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { RoleUseCase } from "../use-cases/role-use-case";
import { validateRole } from "../schema-validation/role-schema";

class RoleController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    try {
      await validateRole(request.body);
      const useCase = new RoleUseCase();
      const newRole = await useCase.create({ name });
      return response.status(201).json(newRole);
    } catch (error) {
      throw new AppError(`Erro ao criar role: ${error.message}`);
    }
  }
}
export { RoleController };
