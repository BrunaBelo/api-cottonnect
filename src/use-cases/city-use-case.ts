import { AppError } from "../errors/app-error";
import { City } from "../model/city";
import { CityRepository } from "../repository/city-repository";

class CityUseCase {
  private repository: CityRepository;

  constructor() {
    this.repository = new CityRepository();
  }

  async create(city: City): Promise<City> {
    const existCity = await this.repository.findByName(city.name);
    const existIbge = await this.repository.findByIbge(city.ibge);
    if (existCity) {
      throw new AppError(`O nome ${city.name} já está em uso`);
    }
    if (existIbge) {
      throw new AppError(`O identificador IBGE ${city.ibge} já está em uso`);
    }
    const newCity = await this.repository.create(city);
    return newCity;
  }

  async update(id: string, city: City): Promise<City> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<City> {
    throw new Error("Method not implemented.");
  }
}
export { CityUseCase };
