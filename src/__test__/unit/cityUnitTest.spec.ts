import connection from "../../database/connection";
import { City } from "../../model/city";
import { CityUseCase } from "../../use-cases/cityUseCase";
import { cityCuritiba } from "../factories/cityFactory";
import { stateParana } from "../factories/stateFactory";

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
      city.state_id = (await stateParana.create()).id
      const newCity = await cityUseCase.create(city);
      expect(newCity).toMatchObject(city);
    });
  });
});
