import { getCustomRepository } from "typeorm";
import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";
import { auctionFactory } from "../factories/auction-factory";
import { biddingFactory } from "../factories/bidding-factory";
import { userFactory } from "../factories/user-factory";
import CreateService from "../../service/user/create-service";
import connection from "../../database/connection";

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

    describe("When create donations to user", () => {
      it("associate donations to the user", async () => {
        const newUser = await userFactory({});
        const auction01 = await auctionFactory({ userId: newUser });
        const auction02 = await auctionFactory({ userId: newUser });

        const auctions = (await userRepository.findOne(newUser.id, { relations: ['auctions']})).auctions

        expect(auctions).toEqual([auction01, auction02]);
      });
    });

    describe("When create binddings to user", () => {
      it("associate binddings to the user", async () => {
        const newUser = await userFactory({});
        const newAuction = await auctionFactory({});
        const newBindding = await biddingFactory({ userId: newUser.id, auctionId: newAuction.id });

        const binddings = (await userRepository.findOne(newUser.id, { relations: ['biddings']})).biddings

        expect(binddings).toContainEqual(newBindding);
      });
    });
  });
});
