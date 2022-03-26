import { getCustomRepository } from "typeorm";
import connection from "../../database/connection";
import { City } from "../../model/city";
import { CityRepository } from "../../repository/city-repository";
import CreateService from "../../service/city/create-service";
import { cityFactory } from "../factories/city-factory";

describe("City", () => {
  let cityRepository: CityRepository;

  beforeAll(async () => {
    await connection.create();
    cityRepository = getCustomRepository(CityRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create City", () => {
    it("create new City", async () => {
      const newCity = await cityFactory({});

      expect(await cityRepository.findOne(newCity.id)).toMatchObject(newCity);
    });

    describe("When city name already exist", () => {
      it("don't create new City", async () => {
        const city = await cityFactory({ name: 'Curitiba' });

        const createCity = async() => {
          let newCity = { name: city.name, ibge: 9878 } as City;
          newCity = await new CreateService(newCity).run();
        }

        await expect(async() => await createCity())
        .rejects
        .toMatchObject({message: `O nome ${city.name} já está em uso`})
      });
    });

    describe("When city ibge already exist", () => {
      it("don't create new City", async () => {
        const city = await cityFactory({ ibge: 2365 });

        const createCity = async() => {
          let newCity = { name: 'New name', ibge: city.ibge } as City;
          newCity = await new CreateService(newCity).run();
        }

        await expect(async() => await createCity())
        .rejects
        .toMatchObject({message: `O identificador IBGE ${city.ibge} já está em uso`})
      });
    });
  });
});
