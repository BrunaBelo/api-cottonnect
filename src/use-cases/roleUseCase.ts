import { IRolesRepository } from "../irepositories/IRolesRepository";
import { Role } from "../model/Role";

class RoleUseCase {
  private roleRepository: IRolesRepository;

  constructor(repository: IRolesRepository) {
    this.roleRepository = repository;
  }

  async createRole(name: string): Promise<Role> {
    const newrole = await this.roleRepository.create(name);
    return newrole;
  }
}
export { RoleUseCase };
