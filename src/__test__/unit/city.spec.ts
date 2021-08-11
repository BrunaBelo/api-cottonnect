import "../../database/connection";
import connection from "../../database/connection";
import { City } from "../../model/city";
import { State } from "../../model/state";
import { CityUseCase } from "../../use-cases/cityUseCase";
import { StateUseCase } from "../../use-cases/stateUseCase";

let cityUseCase: CityUseCase;
let stateUseCase: StateUseCase;

const stateSeed: State = {
    name: "Paraná",
    ibge: 1234,
};

const citySeed: City = {
    name: "Curitiba",
    ibge: 1234,
    state_id: null,
};

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
    });

    it("create new City", async () => {
        const state = await stateUseCase.create(stateSeed);
        citySeed.state_id = state.id
        const city = await cityUseCase.create(citySeed);
        expect(city).toMatchObject(citySeed);
    });
});
