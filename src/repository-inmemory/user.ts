import {
  IUsersRepository,
  ICreateUser,
  IUpdateUser,
} from "../irepositories/IUsersRepository";
import { User } from "../model/User";

class UserRepositoryInMemory implements IUsersRepository {
  private repository: User[];

  constructor() {
    this.repository = [];
  }

  async create(userData: ICreateUser): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone_number: userData.phone_number,
      birth_day: userData.birth_day,
      phone_verified: userData.phone_verified,
      additional_information: userData.additional_information,
      city_id: userData.city_id,
      role_id: userData.role_id,
    });
    this.repository.push(newUser);
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
    const user = this.repository.find((user) => user.email === email);
    return user;
  }
}

export { UserRepositoryInMemory };
