import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { City } from "../model/city";
import { validateCity } from "../schema-validation/city-schema";
import { CityUseCase } from "../use-cases/city-use-case";

class CityController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, ibge, stateId }: City = request.body;

    try {
      await validateCity(request.body);
      const cityUserCase = new CityUseCase();
      const newCity = await cityUserCase.create({ name, ibge, stateId });
      return response.status(201).json(newCity);
    } catch (error) {
      throw new AppError(`Erro ao criar cidade: ${error.message}`);
    }
  }
}
export { CityController };
