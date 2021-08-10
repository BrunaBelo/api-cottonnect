import { Role } from "../model/role";
import { RolesRepository } from "../repository/role";

class RoleUseCase {
  private repository: RolesRepository;

  constructor() {
    this.repository = new RolesRepository();
  }

  async createRole(name: string): Promise<Role> {
    const role = await this.repository.findByName(name);
    if (role) {
      throw new Error(`O nome ${role.name} já está em uso`);
    }

    const newrole = await this.repository.create(name);
    return newrole;
  }
}
export { RoleUseCase };
