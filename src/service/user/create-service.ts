import { getCustomRepository, Repository } from "typeorm"
import { AppError } from "../../errors/app-error"
import { User } from "../../model/user"
import { UserRepository } from "../../repository/user-repository"

class CreateService {
  private repository: UserRepository

  constructor(private user: User){
    this.user = user
    this.repository = getCustomRepository(UserRepository)
  }

  async run(): Promise<User> {
    const { repository, user } = this

    const existEmail = await repository.findOne({ where: { email: user.email } });
    const existcpf = await repository.findOne({ where: { cpf: user.cpf } });
    const existPhoneNumber = await repository.findOne({ where: { phoneNumber: user.phoneNumber } });
    //.log(existEmail, await repository.find(),'<========')
    if (existEmail) {
      throw new AppError(`O email ${user.email} já está em uso`);
    }

    if (existPhoneNumber) {
      throw new AppError(`O número de telefone ${user.phoneNumber} já está em uso`);
    }

    if (existcpf) {
      throw new AppError(`O CPF ${user.cpf} já está em uso`);
    }

    if(!user.roleId){
      user.roleId = (await repository.findOne({ name: 'user' })).id
    }

    const newuser = repository.createAndSave(user)

    return newuser
  }
}

export default CreateService
