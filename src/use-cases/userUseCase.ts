import {
  ICreateUser,
  IUsersRepository,
} from "../irepositories/IUsersRepository";
import { User } from "../model/User";

class UserUseCase {
  private userRepository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.userRepository = repository;
  }

  async create(userData: ICreateUser): Promise<User> {
    const checkUser = await this.userRepository.findByEmail(userData.email);
    if (checkUser) {
      throw new Error("O email de usuário já existe");
    }
    const user = await this.userRepository.create(userData);
    return user;
  }
}

export { UserUseCase };
