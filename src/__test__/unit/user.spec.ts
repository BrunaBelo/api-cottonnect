import { Role } from "../../model/role";
import { User } from "../../model/user";
import { RoleUseCase } from "../../use-cases/roleUseCase";
import { UserUseCase } from "../../use-cases/userUseCase";

let userUseCase: UserUseCase;
let roleUseCase: RoleUseCase;
// let cityUseCase: CityUseCase;

const roleSeed: Role = {
  name: "admin",
};

const createUserSeed = (roleId: string, cityId: string): User => ({
  name: "Ana",
  email: "ana@gmail.com",
  password: "1234",
  phone_number: "4299999999",
  birth_day: new Date(),
  phone_verified: true,
  additional_information: "",
  city_id: cityId,
  role_id: roleId,
});

describe("create user", () => {
  beforeEach(async () => {
    // roleUseCase = new RoleUseCase();
    // userUseCase = new UserUseCase();
    // // cityUseCase = new CityUseCase();
    // const role = await roleUseCase.createRole(roleSeed.name);
    // // const city = await cityUseCase.createCity(roleSeed.name);
    // const userSeed = createUserSeed(role, city);
    // const user = await roleUseCase.createRole(userSeed);
  });

  it("create user", async () => {
    // const user = await useCase.create(userSeed);
    // expect(user).toMatchObject(userSeed);
  });

  it("not create a user that already exists", async () => {
    // let errorMessage = "";
    // await useCase.create(userSeed);
    // try {
    //   await useCase.create(userSeed);
    // } catch (error) {
    //   errorMessage = error.message;
    // }
    // expect(errorMessage).toBe("O email de usuário já existe");
  });
});
