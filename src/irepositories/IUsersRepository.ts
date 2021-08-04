import { User } from "../model/User";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  birth_day: Date;
  phone_verified: boolean;
  additional_information: string;
  city_id: string;
  role_id: string;
}

interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  birth_day?: Date;
  additional_information?: string;
  city_id?: string;
  role_id?: string;
}

interface IUsersRepository {
  create(userData: ICreateUser): Promise<User>;
  update(id: string, userData: IUpdateUser): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User>;
  findByName(name: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
export { IUsersRepository, ICreateUser, IUpdateUser };
