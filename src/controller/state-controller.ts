import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/app-error";
import { State } from "../model/state";
import { CityRepository } from "../repository/city-repository";
import { StateRepository } from "../repository/state-repository";
import { validateState } from "../schema-validation/state-schema";

class StateController {
  async create(request: Request, response: Response): Promise<Response> {
    const stateRepository = getCustomRepository(StateRepository);

    const { name, ibge }: State = request.body;

    try {
      await validateState(request.body);

      const newState = await stateRepository.createAndSave({ name, ibge });
      return response.status(201).json(newState);
    } catch (error) {
      throw new AppError(`Erro ao criar estado: ${error.message}`);
    }
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const stateRepository = getCustomRepository(StateRepository);
    const allStates = await stateRepository.getAll()

    return response.status(200).json(allStates)
  }


  async getCitiesByStateId(request: Request, response: Response): Promise<Response> {
    const cityRepository = getCustomRepository(CityRepository);

    const { stateId } = request.params

    const cities = await cityRepository.getByStateId(stateId)

    return response.status(200).json(cities)
  }
}

export { StateController };
