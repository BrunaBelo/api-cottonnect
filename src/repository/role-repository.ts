import { EntityRepository, Repository } from "typeorm";
import { AppError } from "../errors/app-error";
import { Role } from "../model/role";

@EntityRepository(Role)
class RoleRepository extends Repository<Role>{
  async createAndSave(role: Role): Promise<Role> {
    const existRole = await this.findByName(role.name);

    if (existRole) {
      throw new AppError(`O nome ${role.name} já está em uso`);
    }

    const newRole = this.create(role);
    await this.save(newRole);
    return newRole;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.findOne({ where: { name } });
    return role;
  }
}

export { RoleRepository };
