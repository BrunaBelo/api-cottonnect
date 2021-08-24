import { User } from "../model/user";
import { UserRepository } from "../repository/user-repository";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(user: User): Promise<User> {
    const checkUser = await this.userRepository.findByEmail(user.email);
    if (checkUser) {
      throw new Error("O email de usuário já existe");
    }
    const userCreatedat = await this.userRepository.create(user);
    return userCreatedat;
  }
}

export { UserUseCase };
