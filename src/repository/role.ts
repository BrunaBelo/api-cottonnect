import { getRepository, Repository } from "typeorm";
import { Role } from "../model/role";


class RoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = getRepository(Role);
  }

  async create(name: string): Promise<Role> {
    const role = this.repository.create({ name });
    await this.repository.save(role);
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.repository.findOne({ where: { name } });
    return role;
  }
}

export { RoleRepository };
