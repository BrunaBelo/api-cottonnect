import bcrypt from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../errors/app-error";
import { User } from "../../model/user";
import { RoleRepository } from "../../repository/role-repository";
import { UserRepository } from "../../repository/user-repository";

class CreateUserService {
  private repository: UserRepository;
  private roleRepository: RoleRepository;
  private defaultCottonFlakes = 5;

  constructor(private user: User){
    this.user = user;
    this.repository = getCustomRepository(UserRepository);
    this.roleRepository = getCustomRepository(RoleRepository);
  }

  async run(): Promise<User> {
    const { repository, user, roleRepository } = this;

    const existEmail = await repository.findOne({ where: { email: user.email } });
    const existcpf = await repository.findOne({ where: { cpf: user.cpf } });
    const existPhoneNumber = await repository.findOne({ where: { phoneNumber: user.phoneNumber } });

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
      user.roleId = (await roleRepository.findOne({ name: 'user' })).id
    }

    user.cottonFlakes = this.defaultCottonFlakes;
    user.password = await bcrypt.hash(user.password, 10);
    const newuser = repository.createAndSave(user);

    return newuser
  }
}

export default CreateUserService;
