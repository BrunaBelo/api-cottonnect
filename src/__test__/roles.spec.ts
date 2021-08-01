import { RolesRepositoryInMemory } from "../repository-inmemory/role";
import { RoleUseCase } from "../use-cases/roleUseCase";

let roleRepository: RolesRepositoryInMemory;
let roleUseCase: RoleUseCase;

describe("Create Role", () => {
  beforeEach(() => {
    roleRepository = new RolesRepositoryInMemory();
    roleUseCase = new RoleUseCase(roleRepository);
  });

  it("Shoud create new role", async () => {
    const newRole = await roleUseCase.createRole("Ana Bruna");
    expect(newRole.name).toBe("Ana Bruna");
  });
});
