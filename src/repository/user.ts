import { getRepository, Repository } from "typeorm";

import {
  ICreateUser,
  IUpdateUser,
  IUsersRepository,
} from "../irepositories/IUsersRepository";
import { User } from "../model/User";

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(userData: ICreateUser): Promise<User> {
    const newUser = this.repository.create(userData);
    await this.repository.save(newUser);
    return newUser;
  }

  async update(id: string, userData: IUpdateUser): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}

export { UserRepository };
