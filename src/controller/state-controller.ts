import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { State } from "../model/state";
import { validateState } from "../schema-validation/state-schema";
import { StateUseCase } from "../use-cases/state-use-case";

class StateController {
  private useCase: StateUseCase;

  async index(request: Request, response: Response): Promise<Response> {
    this.useCase = new StateUseCase();
    const allStates = await this.useCase.getAll()

    return response.status(200).json(allStates)
  }

  async create(request: Request, response: Response): Promise<Response> {
    this.useCase = new StateUseCase();
    const { name, ibge }: State = request.body;

    try {
      await validateState(request.body);

      const newState = await this.useCase.create({ name, ibge });
      return response.status(201).json(newState);
    } catch (error) {
      throw new AppError(`Erro ao criar estado: ${error.message}`);
    }
  }

  async getCitiesByStateId(request: Request, response: Response): Promise<Response> {
    const { stateId } = request.params

    this.useCase = new StateUseCase();

    const cities = await this.useCase.getCityByStateId(stateId)

    return response.status(200).json(cities)
  }
}
export { StateController };
