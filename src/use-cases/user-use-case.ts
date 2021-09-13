import { AppError } from "../errors/app-error";
import { User } from "../model/user";
import { UserRepository } from "../repository/user-repository";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(user: User): Promise<User> {
    const existUser = await this.userRepository.findByEmail(user.email);
    const existPersonId = await this.userRepository.findByPersonId(user.personId);
    const existPhoneNumber = await this.userRepository.findByPhoneNumber(user.phoneNumber);
    if (existUser) {
      throw new AppError(`O email ${user.email} já está em uso`);
    }
    if (existPhoneNumber) {
      throw new AppError(`O número de telefone ${user.phoneNumber} já está em uso`);
    }
    if (existPersonId) {
      throw new AppError(`O CPF ${user.personId} já está em uso`);
    }
    const userCreatedat = await this.userRepository.create(user);
    return userCreatedat;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}

export { UserUseCase };
