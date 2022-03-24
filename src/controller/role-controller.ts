import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/app-error";
import { RoleRepository } from "../repository/role-repository";
import { validateRole } from "../schema-validation/role-schema";

class RoleController {
  async create(request: Request, response: Response): Promise<Response> {
    const roleRepository = getCustomRepository(RoleRepository);

    const { name } = request.body;

    try {
      await validateRole(request.body);
      const newRole = await roleRepository.createAndSave({ name });

      return response.status(201).json(newRole);
    } catch (error) {
      throw new AppError(`Erro ao criar role: ${error.message}`);
    }
  }
}

export { RoleController };
