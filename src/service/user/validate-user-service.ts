import { getCustomRepository } from "typeorm";
import { AppError } from "../../errors/app-error";
import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";

class ValidateUserService {
  private repository: UserRepository;

  constructor(private type: string, private value: string){
    this.repository = getCustomRepository(UserRepository);
    this.type = type;
    this.value = value;
  }

  async run(): Promise<User> {
    const { type, value, repository } = this;

    switch (type) {
      case 'email':
        return await repository.findOne({where: { email: value }});
      case 'phoneNumber':
        return await repository.findOne({where: { phoneNumber: value }});
      case 'cpf':
        return await repository.findOne({where: { cpf: value }});
      default:
        throw new AppError("Atributo não encontrado")
    }
  }
}

export default ValidateUserService;
