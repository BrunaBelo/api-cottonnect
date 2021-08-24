import { City } from "../model/city";
import { CityRepository } from "../repository/city-repository";

class CityUseCase {
    private repository: CityRepository;

    constructor() {
        this.repository = new CityRepository();
    }

    async create(city: City): Promise<City> {
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
