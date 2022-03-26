import { getCustomRepository, getRepository, Repository } from "typeorm";
import connection from "../../database/connection";
import { Role } from "../../model/role";
import { RoleRepository } from "../../repository/role-repository";
import CreateService from "../../service/role/create-service";
import { roleFactory } from "../factories/role-factory";
//import { roleAdmin } from "../factories/role-factory";

describe("Role", () => {
  let roleAdm: Role;
  let roleUser: Role;
  let roleRepository: RoleRepository;
  let createService: CreateService;

  beforeAll(async () => {
    await connection.create();
    roleRepository = getCustomRepository(RoleRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    roleAdm = await roleFactory('admin');
    roleUser = await roleFactory();
  });

  describe("Role", () => {
    it("create role", async() => {
      let newRole = { name: "boss" } as Role;
      newRole = await new CreateService(newRole).run();

      expect(await roleRepository.findOne(newRole.id)).toEqual(newRole);
    });

    it("return all roles", async() => {
      const allRoles = await roleRepository.find();

      expect(allRoles).toContainEqual(roleUser);
      expect(allRoles).toContainEqual(roleAdm);
    });

    describe("When role name already exists", () => {
      test("return throw exception", async() => {
        const allRoles = await roleRepository.find();
        const createRole = async() => {
          let newRole = { name: allRoles[0].name } as Role;
          newRole = await new CreateService(newRole).run();
        }

        await expect(async() => await createRole())
        .rejects
        .toMatchObject({message: `O nome ${allRoles[0].name} já está em uso`})
      });
    })
  });
});


// let errorMessage = ''
//         try {
//           let newRole = { name: allRoles[0].name } as Role;
//           newRole = await new CreateService(newRole).run();
//         } catch (error) {
//           errorMessage = error.message
//         }

//         expect(errorMessage).toBe(`O nome ${allRoles[0].name} já está em uso`);
