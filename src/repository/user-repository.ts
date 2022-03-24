import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { AppError } from "../errors/app-error";
import { User } from "../model/user";
import { RoleRepository } from "./role-repository";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async createAndSave(user: User): Promise<User> {
    const existUser = await this.findByEmail(user.email);
    const existcpf = await this.findByCpf(user.cpf);
    const existPhoneNumber = await this.findByPhoneNumber(user.phoneNumber);

    if (existUser) {
      throw new AppError(`O email ${user.email} já está em uso`);
    }

    if (existPhoneNumber) {
      throw new AppError(`O número de telefone ${user.phoneNumber} já está em uso`);
    }

    if (existcpf) {
      throw new AppError(`O CPF ${user.cpf} já está em uso`);
    }

    if(!user.roleId){
      const defaultRoleName = 'user'
      const defaultRoleInfo = await getCustomRepository(RoleRepository).findOne({ name: defaultRoleName })
      user.roleId = defaultRoleInfo.id
    }

    const newUser = this.create(user);
    await this.save(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } });
    return user;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const user = await this.findOne({ where: { phoneNumber } });
    return user;
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.findOne({ where: { cpf } });
    return user;
  }
}

export { UserRepository };
