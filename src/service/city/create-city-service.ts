import { getCustomRepository } from "typeorm"
import { AppError } from "../../errors/app-error"
import { City } from "../../model/city"
import { CityRepository } from "../../repository/city-repository"

class CreateCityService {
  private repository: CityRepository;

  constructor(private city: City){
    this.city = city;
    this.repository = getCustomRepository(CityRepository);
  }

  async run(): Promise<City>{
    const { repository, city } = this;

    const existCity = await repository.findOne({ where: { name: city.name } });
    const existIbge = await repository.findOne({ where: { ibge: city.ibge } });

    if (existCity) {
      throw new AppError(`O nome ${city.name} já está em uso`);
    }

    if (existIbge) {
      throw new AppError(`O identificador IBGE ${city.ibge} já está em uso`);
    }

    const newCity = repository.createAndSave(city);

    return newCity;
  }
}

export default CreateCityService;
