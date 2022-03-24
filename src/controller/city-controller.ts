import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/app-error";
import { City } from "../model/city";
import { CityRepository } from "../repository/city-repository";
import { validateCity } from "../schema-validation/city-schema";

class CityController {
  async create(request: Request, response: Response): Promise<Response> {
    const cityRepository = getCustomRepository(CityRepository)

    const { name, ibge, stateId }: City = request.body;

    try {
      await validateCity(request.body);
      const newCity = cityRepository.create({ name, ibge, stateId });
      return response.status(201).json(newCity);
    } catch (error) {
      throw new AppError(`Erro ao criar cidade: ${error.message}`);
    }
  }
}

export { CityController };
