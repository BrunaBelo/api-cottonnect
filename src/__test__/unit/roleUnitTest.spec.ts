import connection from "../../database/connection";
import { RoleUseCase } from "../../use-cases/roleUseCase";
import { roleAdmin } from "../factories/roleFactory";

let role = roleAdmin
let roleUseCase: RoleUseCase;

describe("Create Role", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
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
