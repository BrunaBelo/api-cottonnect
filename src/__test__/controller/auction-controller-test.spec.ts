import request from 'supertest';
import { Equal } from 'typeorm';
import connection from "../../database/connection";
import { User } from '../../model/user';
import { app } from "../../server";
import LoginUserService from '../../service/user/login-user-service';
import { auctionFactory } from '../factories/auction-factory';
import { userFactory } from '../factories/user-factory';

describe("Auction", () => {
  let user: User;

  beforeAll(async() => {
    await connection.create();
  })

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    user = await userFactory({ password: "12345678" });
    user = await new LoginUserService(user.email, "12345678").run();
  });

  describe("GET #findAuction", () => {
    it("return auction", async() => {
      const auction = await auctionFactory({});

      const res = await request(app).get(`/auctions/${auction.id}`).set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual(auction.toString());
    });

    it("return empty when not finding an auction", async() => {
      const res = await request(app).get("/auctions/012").set({ "x-access-token": user.token });

      expect(res.status).toEqual(422);
      expect(res.body.message).toBe("Não foi possível encontrar a auction solicitada");
    });
  });
});
