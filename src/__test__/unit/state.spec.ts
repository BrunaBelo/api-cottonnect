import "../../database/connection";
import connection from "../../database/connection";
import { State } from "../../model/state";
import { StateUseCase } from "../../use-cases/stateUseCase";

let stateUseCase: StateUseCase;

const stateSeed: State = {
  name: "Paraná",
  ibge: 1234,
};

describe("Create State", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    stateUseCase = new StateUseCase();
  });

  it("create new State", async () => {
    const state = await stateUseCase.create(stateSeed);
    expect(state).toMatchObject(stateSeed);
  });
});
