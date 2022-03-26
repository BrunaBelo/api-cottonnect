import { getCustomRepository } from "typeorm";
import connection from "../../database/connection";
import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";
import CreateService from "../../service/user/create-service";
import { userFactory } from "../factories/user-factory";

describe("User", () => {
  let userRepository: UserRepository;
  let user: User;

  beforeAll(async () => {
    await connection.create();
    userRepository = getCustomRepository(UserRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    user = await userFactory();
  });

  describe("Create user", () => {
    it("create new user", async () => {
      let newUser = await userFactory({}, false);
      newUser = await new CreateService(newUser).run();

      expect(await userRepository.findOne(newUser.id)).toMatchObject(newUser);
    });

    describe("When user email already exist", () => {
      it("don't create a user", async () => {
        const createUser = async() => {
          let newUser = await userFactory({ email: user.email }, false)
          await new CreateService(newUser).run();
        }

        await expect(async() => await createUser())
        .rejects
        .toMatchObject({message: `O email ${user.email} já está em uso`})
      });
    });

    describe("When user phoneNumber already exist", () => {
      it("don't create a user", async () => {
        const createUser = async() => {
          let newUser = await userFactory({ email: "new email", phoneNumber: user.phoneNumber }, false);
          newUser = await new CreateService(newUser).run();
        }
        await expect(async() => await createUser())
        .rejects
        .toMatchObject({message: `O número de telefone ${user.phoneNumber} já está em uso`})
      });
    });

    describe("When user cpf already exist", () => {
      it("don't create a user", async () => {
        const user = await userFactory();

        const createUser = async() => {
          let newUser = await userFactory({ cpf: user.cpf }, false);
          newUser = await new CreateService(newUser).run();
        }

        await expect(async() => await createUser())
        .rejects
        .toMatchObject({message: `O CPF ${user.cpf} já está em uso`})
      });
    });
  });
});
