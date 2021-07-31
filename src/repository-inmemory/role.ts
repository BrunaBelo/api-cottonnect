import { IRolesRepository } from "../irepositories/IRolesRepository";
import { Role } from "../model/Role";

class RolesRepository implements IRolesRepository {
  private repository: Role[];

  constructor() {
    this.repository = [];
  }

  async create(name: string): Promise<Role> {
    const role = new Role();
    role.name = name;
    this.repository.push(role);
    return role;
  }
}

export { RolesRepository };
