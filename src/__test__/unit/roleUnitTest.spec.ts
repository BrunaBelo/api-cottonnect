import connection from "../../database/connection";
import { Role } from "../../model/role";
import { RoleUseCase } from "../../use-cases/roleUseCase";
import { roleAdmin } from "../factories/roleFactory";

describe("Create Role", () => {
  let roleUseCase: RoleUseCase;
  let role: Role;

  beforeAll(async () => {
    await connection.create();
    role = roleAdmin.build();
    roleUseCase = new RoleUseCase();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
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
