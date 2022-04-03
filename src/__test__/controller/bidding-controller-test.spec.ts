import request from 'supertest';
import connection from "../../database/connection";
import LoginUserService from '../../service/user/login-user-service';
import { User } from '../../model/user';
import { app } from "../../server";
import { userFactory } from '../factories/user-factory';
import { biddingFactory } from '../factories/bidding-factory';

describe("Bidding", () => {
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

  describe("POST #create", () => {
    it("create new bidding", async() => {
      let bidding = await biddingFactory({}, false);

      const res = await request(app).post('/biddings')
                                    .set({ "x-access-token": user.token })
                                    .send({ ...bidding, closingDate: new Date() });

      expect(res.status).toEqual(201);
      expect(res.body.toString()).toEqual([bidding].toString());
    });

    it("don't create new bidding when attrs is missing", async() => {
      let bidding = await biddingFactory({}, false);
      bidding.auctionId = null;

      const res = await request(app).post('/biddings')
                                    .set({ "x-access-token": user.token })
                                    .send(bidding);

      expect(res.status).toEqual(400);
      expect(res.body.message).toContain("Não foi possivel criar o lance");
    });
  });
});
