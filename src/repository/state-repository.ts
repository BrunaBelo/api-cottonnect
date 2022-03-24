import { EntityRepository, getRepository, Repository } from "typeorm";
import { AppError } from "../errors/app-error";
import { State } from "../model/state";

@EntityRepository(State)
class StateRepository extends Repository<State> {

  async createAndSave(state: State): Promise<State> {
    const existState = await this.findByName(state.name);
    const existIbge = await this.findByIbge(state.ibge);

    if (existState) {
      throw new AppError(`O nome ${state.name} já está em uso`);
    }

    if (existIbge) {
      throw new AppError(`O identificador IBGE ${state.ibge} já está em uso`);
    }

    const new_state = this.create(state);
    await this.save(new_state);
    return new_state;
  }

  async getAll(): Promise<State[]> {
    const allStates = await this.find()
    return allStates
  }

  async findByName(name: string): Promise<State> {
    const state = await this.findOne({ where: { name } });
    return state;
  }

  async findByIbge(ibge: number): Promise<State> {
    const state = await this.findOne({ where: { ibge } });
    return state;
  }
}

export { StateRepository };
