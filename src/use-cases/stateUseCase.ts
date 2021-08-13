import { State } from "../model/state";
import { StateRepository } from "../repository/stateRepository";

class StateUseCase {
  private repository: StateRepository;

  constructor() {
    this.repository = new StateRepository();
  }

  async create(state: State): Promise<State> {
    const newState = await this.repository.create(state);
    return newState;
  }

  async update(id: string, state: State): Promise<State> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<State> {
    throw new Error("Method not implemented.");
  }
}
export { StateUseCase };
