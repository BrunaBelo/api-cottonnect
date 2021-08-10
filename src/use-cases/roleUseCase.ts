import { Role } from "../model/role";
import { RoleRepository } from "../repository/role";

class RoleUseCase {
  private repository: RoleRepository;

  constructor() {
    this.repository = new RoleRepository();
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
