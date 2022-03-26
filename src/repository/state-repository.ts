import { EntityRepository, getRepository, Repository } from "typeorm";
import { AppError } from "../errors/app-error";
import { State } from "../model/state";

@EntityRepository(State)
class StateRepository extends Repository<State> {

  async createAndSave(state: State): Promise<State> {
    const new_state = this.create(state);
    await this.save(new_state);
    return new_state;
  }

  async getAll(): Promise<State[]> {
    const allStates = await this.find({order: {
      'name': 'ASC'
    }});

    return allStates
  }
}

export { StateRepository };
