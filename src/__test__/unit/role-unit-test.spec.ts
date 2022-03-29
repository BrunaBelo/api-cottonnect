import { getCustomRepository } from "typeorm";
import connection from "../../database/connection";
import { Role } from "../../model/role";
import { RoleRepository } from "../../repository/role-repository";
import CreateRoleService from "../../service/role/create-role-service";
import { roleFactory } from "../factories/role-factory";

describe("Role", () => {
  let roleRepository: RoleRepository;

  beforeAll(async () => {
    await connection.create();
    roleRepository = getCustomRepository(RoleRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Role", () => {
    it("create role", async() => {
      let newRole = { name: "boss" } as Role;
      newRole = await new CreateRoleService(newRole).run();

      expect(await roleRepository.findOne(newRole.id)).toEqual(newRole);
    });

    it("return all roles", async() => {
      const roleAdm = await roleFactory('admin');
      const roleUser = await roleFactory();
      const allRoles = await roleRepository.find();

      expect(allRoles).toContainEqual(roleUser);
      expect(allRoles).toContainEqual(roleAdm);
    });

    describe("When role name already exists", () => {
      test("return throw exception", async() => {
        const role = await roleFactory('admin');

        const createRole = async() => {
          let newRole = { name: role.name } as Role;
          newRole = await new CreateRoleService(newRole).run();
        }

        await expect(async() => await createRole())
        .rejects
        .toMatchObject({message: `O nome ${role.name} já está em uso`})
      });
    })
  });
});
