import { AppError } from "../errors/app-error";
import { State } from "../model/state";
import { StateRepository } from "../repository/state-repository";

class StateUseCase {
  private repository: StateRepository;

  constructor() {
    this.repository = new StateRepository();
  }

  async create(state: State): Promise<State> {
    const existState = await this.repository.findByName(state.name);
    const existIbge = await this.repository.findByIbge(state.ibge);
    if (existState) {
      throw new AppError(`O nome ${state.name} já está em uso`);
    }
    if (existIbge) {
      throw new AppError(`O identificador IBGE ${state.ibge} já está em uso`);
    }
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
