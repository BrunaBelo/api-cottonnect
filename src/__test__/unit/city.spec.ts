import "../../database/connection";
import connection from "../../database/connection";
import { City } from "../../model/city";
import { State } from "../../model/state";
import { CityUseCase } from "../../use-cases/cityUseCase";
import { StateUseCase } from "../../use-cases/stateUseCase";
import { cityCuritiba } from "../factories/cityFactory";
import { stateParana } from "../factories/stateFactory";

let cityUseCase: CityUseCase;
let stateUseCase: StateUseCase;

let state: State
const city = cityCuritiba

describe("Create City", () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await connection.clear();
        cityUseCase = new CityUseCase();
        stateUseCase = new StateUseCase();
        state = await stateUseCase.create(stateParana);
    });

    it("create new City", async () => {
        city.state_id = state.id
        const newCity = await cityUseCase.create(city);
        expect(newCity).toMatchObject(city);
    });
});
