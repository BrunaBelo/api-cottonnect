import connection from "../../database/connection";
import { City } from "../../model/city";
import { CityUseCase } from "../../use-cases/city-use-case";
import { cityCuritiba } from "../factories/city-factory";
import { stateParana } from "../factories/state-factory";

describe("City", () => {
  let cityUseCase: CityUseCase;
  let city: City;

  beforeAll(async () => {
    await connection.create();
    cityUseCase = new CityUseCase();
    city = cityCuritiba.build();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create City", () => {
    it("create new City", async () => {
      city.stateId = (await stateParana.create()).id
      const newCity = await cityUseCase.create(city);
      expect(newCity).toMatchObject(city);
    });
  });
});
