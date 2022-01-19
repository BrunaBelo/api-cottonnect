import { AppError } from "../errors/app-error";
import { User } from "../model/user";
import { UserRepository } from "../repository/user-repository";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(user: User): Promise<User> {
    await this.validUser(user)
    const userCreatedat = await this.userRepository.create(user);
    return userCreatedat;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async validUser(user){
    const existUser = await this.userRepository.findByEmail(user.email);
    const existcpf = await this.userRepository.findBycpf(user.cpf);
    const existPhoneNumber = await this.userRepository.findByPhoneNumber(user.phoneNumber);

    if (existUser) {
      throw new AppError(`O email ${user.email} já está em uso`);
    }
    if (existPhoneNumber) {
      throw new AppError(`O número de telefone ${user.phoneNumber} já está em uso`);
    }
    if (existcpf) {
      throw new AppError(`O CPF ${user.cpf} já está em uso`);
    }
  }
}

export { UserUseCase };
