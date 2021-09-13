import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { State } from "../model/state";
import { validateState } from "../schema-validation/state-schema";
import { StateUseCase } from "../use-cases/state-use-case";

class StateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, ibge }: State = request.body;

    try {
      await validateState(request.body);
      const stateUserCase = new StateUseCase();
      const newState = await stateUserCase.create({ name, ibge });
      return response.status(201).json(newState);
    } catch (error) {
      throw new AppError(`Erro ao criar estado: ${error.message}`);
    }
  }
}
export { StateController };
