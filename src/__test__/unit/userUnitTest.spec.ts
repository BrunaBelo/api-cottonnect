import connection from "../../database/connection";
import { City } from "../../model/city";
import { Role } from "../../model/role";
import { State } from "../../model/state";
import { CityUseCase } from "../../use-cases/cityUseCase";
import { RoleUseCase } from "../../use-cases/roleUseCase";
import { StateUseCase } from "../../use-cases/stateUseCase";
import { UserUseCase } from "../../use-cases/userUseCase";
import { cityCuritiba } from "../factories/cityFactory";
import { roleAdmin } from "../factories/roleFactory";
import { stateParana } from "../factories/stateFactory";
import { user01 } from "../factories/userFactory";

let userUseCase: UserUseCase;
let roleUseCase: RoleUseCase;
let cityUseCase: CityUseCase;
let stateUseCase: StateUseCase;

let state: State
let role: Role;
let city: City;
const user = user01

describe("create user", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    roleUseCase = new RoleUseCase();
    cityUseCase = new CityUseCase();
    userUseCase = new UserUseCase();
    stateUseCase = new StateUseCase();
    state = await stateUseCase.create(stateParana);
    role = await roleUseCase.create(roleAdmin);
    cityCuritiba.state_id = state.id
    city = await cityUseCase.create(cityCuritiba);
    user.role_id = role.id;
    user.city_id = city.id;
  });

  it("create user", async () => {
    const newUser = await userUseCase.create(user);
    expect(newUser).toMatchObject(user);
  });

  it("not create a user that already exists", async () => {
    let errorMessage = "";
    await userUseCase.create(user);
    try {
      await userUseCase.create(user);
    } catch (error) {
      errorMessage = error.message;
    }
    expect(errorMessage).toBe("O email de usuário já existe");
  });
});
