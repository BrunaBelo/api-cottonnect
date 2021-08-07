import { Request, Response } from "express";

import { State } from "../model/state";
import { StateUseCase } from "../use-cases/stateUseCase";

class StateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, ibge }: State = request.body;

    const stateUserCase = new StateUseCase();

    const newState = await stateUserCase.create({ name, ibge });
    return response.status(201).json(newState);
  }
}
export { StateController };
