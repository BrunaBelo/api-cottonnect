import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { AppError } from "../errors/app-error";
import { User } from "../model/user";
import { RoleRepository } from "./role-repository";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async createAndSave(user: User): Promise<User> {
    const newUser = this.create(user);
    await this.save(newUser);
    return newUser;
  }
}

export { UserRepository };
