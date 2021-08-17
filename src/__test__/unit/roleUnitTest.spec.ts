import { factory } from "factory-girl";
import connection from "../../database/connection";
import { Role } from "../../model/role";
import { RoleUseCase } from "../../use-cases/roleUseCase";
import "../factories/roleFactory";

describe("Create Role", () => {
  let role: Role;
  let roleUseCase: RoleUseCase;

  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    role = await factory.attrs('roleAdmin');
    roleUseCase = new RoleUseCase();
  });

  it("create new role", async () => {
    const newRole = await roleUseCase.create(role);
    expect(newRole.name).toBe("Admin");
  });

  it("not create new role", async () => {
    let newRole = await roleUseCase.create(role);
    let error_message = "";
    try {
      newRole = await roleUseCase.create(role);
    } catch (error) {
      error_message = error.message;
    }

    expect(error_message).toBe(`O nome ${newRole.name} já está em uso`);
  });
});
