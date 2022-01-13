import { AppError } from "../errors/app-error";
import { City } from "../model/city";
import { State } from "../model/state";
import { CityRepository } from "../repository/city-repository";
import { StateRepository } from "../repository/state-repository";

class StateUseCase {
  private stateRepository: StateRepository;
  private cityRepository: CityRepository;

  async getAll(): Promise<State[]> {
    this.stateRepository = new StateRepository();
    const allStates = await this.stateRepository.getAll();

    return allStates
  }

  async getCityByStateId(stateId: string): Promise<City[]> {
    this.cityRepository = new CityRepository()
    const cities = await this.cityRepository.getByStateId(stateId)

    return cities
  }

  async create(state: State): Promise<State> {
    this.stateRepository = new StateRepository();
    const existState = await this.stateRepository.findByName(state.name);
    const existIbge = await this.stateRepository.findByIbge(state.ibge);
    if (existState) {
      throw new AppError(`O nome ${state.name} já está em uso`);
    }
    if (existIbge) {
      throw new AppError(`O identificador IBGE ${state.ibge} já está em uso`);
    }
    const newState = await this.stateRepository.create(state);
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
