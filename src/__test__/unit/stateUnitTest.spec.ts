import connection from "../../database/connection";
import { State } from "../../model/state";
import { StateUseCase } from "../../use-cases/stateUseCase";
import { stateParana } from "../factories/stateFactory";

describe("State", () => {
  let state: State;
  let stateUseCase: StateUseCase;

  beforeAll(async () => {
    await connection.create();
    state = stateParana.build();
    stateUseCase = new StateUseCase();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create State", () => {
    it("create new State", async () => {
      const newState = await stateUseCase.create(state);
      expect(newState).toMatchObject(state);
    });
  });
})
