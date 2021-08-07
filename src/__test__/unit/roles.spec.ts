import { RoleUseCase } from "../../use-cases/roleUseCase";

let roleUseCase: RoleUseCase;

describe("Create Role", () => {
  beforeEach(() => {
    roleUseCase = new RoleUseCase();
  });

  it("create new role", async () => {
    const newRole = await roleUseCase.createRole("Ana Bruna");
    expect(newRole.name).toBe("Ana Bruna");
  });

  it("not create new role", async () => {
    let newRole = await roleUseCase.createRole("Ana Bruna");
    let error_message = "";
    try {
      newRole = await roleUseCase.createRole("Ana Bruna");
    } catch (error) {
      error_message = error.message;
    }

    expect(error_message).toBe(`O nome ${newRole.name} já está em uso`);
  });
});
