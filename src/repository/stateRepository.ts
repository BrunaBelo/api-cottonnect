import { getRepository, Repository } from "typeorm";
import { State } from "../model/state";

class StateRepository {
  private repository: Repository<State>;

  constructor() {
    this.repository = getRepository(State);
  }

  async create(state: State): Promise<State> {
    const new_state = this.repository.create(state);
    await this.repository.save(new_state);
    return new_state;
  }

  async update(id: string, state: State): Promise<State> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<State> {
    throw new Error("Method not implemented.");
  }
}

export { StateRepository };