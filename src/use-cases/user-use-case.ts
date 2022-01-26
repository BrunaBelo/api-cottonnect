import { AppError } from "../errors/app-error";
import { User } from "../model/user";
import { UserRepository } from "../repository/user-repository";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(user: User): Promise<User> {
    await this.checkIfUserAlreadyExists(user)
    const userCreatedat = await this.userRepository.create(user);
    return userCreatedat;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async findByPhoneNumber(email: string): Promise<User> {
    const user = await this.userRepository.findByPhoneNumber(email);
    return user;
  }

  async findByCpf(email: string): Promise<User> {
    const user = await this.userRepository.findByCpf(email);
    return user;
  }

  async validateUser(type: string, value: any): Promise<boolean>{
    switch (type) {
      case 'email':
        return this.checkNonexistentUser(await this.userRepository.findByEmail(value))
      case 'phoneNumber':
        return this.checkNonexistentUser(await this.userRepository.findByPhoneNumber(value))
      case 'cpf':
        return this.checkNonexistentUser(await this.userRepository.findByCpf(value))
      default:
        return false;
    }
  }

  private checkNonexistentUser(existUser: any): boolean{
    if (existUser) {
      return false
    }
    return true
  }

  private async checkIfUserAlreadyExists(user: User): Promise<void> {
    const existUser = await this.userRepository.findByEmail(user.email);
    const existcpf = await this.userRepository.findByCpf(user.cpf);
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
