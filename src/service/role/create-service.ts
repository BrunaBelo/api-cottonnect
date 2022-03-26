import { getCustomRepository, Repository } from "typeorm"
import { AppError } from "../../errors/app-error"
import { Role } from "../../model/role"
import { RoleRepository } from "../../repository/role-repository"

class CreateService {
  private repository: RoleRepository;

  constructor(private role: Role){
    this.role = role;
    this.repository = getCustomRepository(RoleRepository);
  }

  async run(): Promise<Role>{
    const { repository, role } = this;

    const existRole = await repository.findOne({ where: { name: role.name } });
    if (existRole) {
      throw new AppError(`O nome ${role.name} já está em uso`);
    }

    const newRole = repository.createAndSave(role);

    return newRole;
  }
}

export default CreateService;
