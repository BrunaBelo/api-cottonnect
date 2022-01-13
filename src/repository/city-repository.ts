import { getRepository, Repository } from "typeorm";
import { City } from "../model/city";

class CityRepository {
  private repository: Repository<City>;

  constructor() {
    this.repository = getRepository(City);
  }

  async getByStateId(stateId: string): Promise<City[]> {
    const cities = await this.repository.find({ where: { stateId } })

    return cities
  }

  async create(city: City): Promise<City> {
    const newCity = this.repository.create(city);
    await this.repository.save(newCity);
    return newCity;
  }

  async update(id: string, city: City): Promise<City> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<City> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<City> {
    const city = await this.repository.findOne({ where: { name } });
    return city;
  }

  async findByIbge(ibge: number): Promise<City> {
    const city = await this.repository.findOne({ where: { ibge } });
    return city;
  }
}

export { CityRepository };
