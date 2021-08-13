import { getRepository, Repository } from "typeorm";
import { Role } from "../model/role";

class RoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = getRepository(Role);
  }

  async create(role: Role): Promise<Role> {
    const newRole = this.repository.create(role);
    await this.repository.save(newRole);
    return newRole;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.repository.findOne({ where: { name } });
    return role;
  }
}

export { RoleRepository };
