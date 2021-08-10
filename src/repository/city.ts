import { getRepository, Repository } from "typeorm";
import { City } from "../model/city";

class CityRepository {
    private repository: Repository<City>;

    constructor() {
        this.repository = getRepository(City);
    }

    async create(city: City): Promise<City> {
        const newCity = this.repository.create(city);
        await this.repository.save(newCity);
        return newCity;
    }

    async update(id: string, state: City): Promise<City> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<City> {
        throw new Error("Method not implemented.");
    }
}

export { CityRepository };
