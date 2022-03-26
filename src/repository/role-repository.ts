import { EntityRepository, Repository } from "typeorm";
import { AppError } from "../errors/app-error";
import { Role } from "../model/role";

@EntityRepository(Role)
class RoleRepository extends Repository<Role>{
  async createAndSave(role: Role): Promise<Role> {
    const newRole = this.create(role);
    await this.save(newRole);

    return newRole;
  }
}

export { RoleRepository };
