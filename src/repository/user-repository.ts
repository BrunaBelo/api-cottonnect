import { getRepository, Repository } from "typeorm";
import { Role } from "../model/role";
import { User } from "../model/user";

class UserRepository {
  private userRepository: Repository<User>;
  private roleRepository: Repository<Role>;

  constructor() {
    this.userRepository = getRepository(User);
    this.roleRepository = getRepository(Role);
  }

  async create(user: User): Promise<User> {
    if(!user.roleId){
      const defaultRoleName = 'user'
      const defaultRoleInfo = await this.roleRepository.findOne({name: defaultRoleName})
      user.roleId = defaultRoleInfo.id
    }
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
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
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    return user;
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { cpf } });
    return user;
  }
}

export { UserRepository };
