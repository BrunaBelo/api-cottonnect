import { Request, Response } from "express";

import { City } from "../model/city";
import { CityUseCase } from "../use-cases/cityUseCase";

class CityController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, ibge, state_id }: City = request.body;

        const cityUserCase = new CityUseCase();

        const newCity = await cityUserCase.create({ name, ibge, state_id });
        return response.status(201).json(newCity);
    }
}
export { CityController };
