import "../../database/connection";
import connection from "../../database/connection";
import { StateUseCase } from "../../use-cases/stateUseCase";
import { stateParana } from "../factories/stateFactory";

let state = stateParana
let stateUseCase: StateUseCase;

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
    const newState = await stateUseCase.create(state);
    expect(newState).toMatchObject(state);
  });
});
