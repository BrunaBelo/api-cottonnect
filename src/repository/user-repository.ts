import { getRepository, Repository } from "typeorm";
import { User } from "../model/user";

class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(user: User): Promise<User> {
    const newUser = this.repository.create(user);
    await this.repository.save(newUser);
    return newUser;
  }

  async update(id: string, user: User): Promise<User> {
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
