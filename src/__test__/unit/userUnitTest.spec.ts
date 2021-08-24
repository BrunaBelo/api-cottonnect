import connection from "../../database/connection";
import { User } from "../../model/user";
import { UserUseCase } from "../../use-cases/userUseCase";
import { cityCuritiba } from "../factories/cityFactory";
import { roleAdmin } from "../factories/roleFactory";
import { stateParana } from "../factories/stateFactory";
import { user01 } from "../factories/userFactory";

describe("User", () => {
  let userUseCase: UserUseCase;
  let user: User;

  beforeAll(async () => {
    await connection.create();
    userUseCase = new UserUseCase();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    const city = await cityCuritiba.create({ state_id: (await stateParana.create()).id });
    user = user01.build({ role_id: (await roleAdmin.create()).id, city_id: city.id });
  });

  describe("Create user", () => {
    it("create new user", async () => {
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
});
