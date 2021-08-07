import { State } from "../../model/state";
import { StateUseCase } from "../../use-cases/stateUseCase";

let stateUseCase: StateUseCase;

const stateSeed: State = {
  name: "Paraná",
  ibge: 1234,
};

describe("Create State", () => {
  beforeEach(() => {
    stateUseCase = new StateUseCase();
  });

  it("create new State", async () => {
    const state = await stateUseCase.create(stateSeed);
    expect(state).toMatchObject(stateSeed);
  });
});
