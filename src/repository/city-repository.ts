import { EntityRepository, Repository } from "typeorm";
import { AppError } from "../errors/app-error";
import { City } from "../model/city";

@EntityRepository(City)
class CityRepository extends Repository<City>{
  async createAndSave(city: City): Promise<City> {
    const newCity = this.create(city);
    await this.save(newCity);

    return newCity;
  }
}

export { CityRepository };
