import { Request, Response } from "express";

import { City } from "../model/city";
import { CityUseCase } from "../use-cases/city-use-case";

class CityController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, ibge, stateId }: City = request.body;

        const cityUserCase = new CityUseCase();

        const newCity = await cityUserCase.create({ name, ibge, stateId });
        return response.status(201).json(newCity);
    }
}
export { CityController };
