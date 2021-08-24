import { Role } from "../model/role";
import { RoleRepository } from "../repository/role-repository";

class RoleUseCase {
  private repository: RoleRepository;

  constructor() {
    this.repository = new RoleRepository();
  }

  async create(role: Role): Promise<Role> {
    const existRole = await this.repository.findByName(role.name);
    if (existRole) {
      throw new Error(`O nome ${role.name} já está em uso`);
    }

    const newRole = await this.repository.create(role);
    return newRole;
  }
}
export { RoleUseCase };
