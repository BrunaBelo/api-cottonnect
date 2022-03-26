import { getCustomRepository, Repository } from "typeorm"
import { AppError } from "../../errors/app-error"
import { State } from "../../model/state"
import { StateRepository } from "../../repository/state-repository"

class CreateService {
  private repository: StateRepository;

  constructor(private state: State){
    this.state = state;
    this.repository = getCustomRepository(StateRepository);
  }

  async run(): Promise<State>{
    const { repository, state } = this;

    const existstate = await repository.findOne({ where: { name: state.name } });
    const existIbge = await repository.findOne({ where: { ibge: state.ibge } });

    if (existstate) {
      throw new AppError(`O nome ${state.name} já está em uso`);
    }

    if (existIbge) {
      throw new AppError(`O identificador IBGE ${state.ibge} já está em uso`);
    }

    const newstate = repository.createAndSave(state);

    return newstate;
  }
}

export default CreateService;
