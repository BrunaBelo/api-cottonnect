import { getRepository, Repository } from "typeorm";

import { IRolesRepository } from "../irepositories/IRolesRepository";
import { Role } from "../model/Role";

class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = getRepository(Role);
  }

  async create(name: string): Promise<Role> {
    const role = this.repository.create({ name });
    await this.repository.save(role);
    return role;
  }
}

export { RolesRepository };
