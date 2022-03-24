import { EntityRepository, Repository } from "typeorm";
import { AppError } from "../errors/app-error";
import { City } from "../model/city";

@EntityRepository(City)
class CityRepository extends Repository<City>{
  async createAndSave(city: City): Promise<City> {
    const existCity = await this.findByName(city.name);
    const existIbge = await this.findByIbge(city.ibge);

    if (existCity) {
      throw new AppError(`O nome ${city.name} já está em uso`);
    }

    if (existIbge) {
      throw new AppError(`O identificador IBGE ${city.ibge} já está em uso`);
    }

    const newCity = this.create(city);
    await this.save(newCity);

    return newCity;
  }

  async getByStateId(stateId: string): Promise<City[]> {
    const cities = await this.find({ where: { stateId } })
    return cities
  }

  async findByName(name: string): Promise<City> {
    const city = await this.findOne({ where: { name } });
    return city;
  }

  async findByIbge(ibge: number): Promise<City> {
    const city = await this.findOne({ where: { ibge } });
    return city;
  }
}

export { CityRepository };
