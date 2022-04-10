import request from 'supertest';
import connection from "../../database/connection";
import LoginUserService from '../../service/user/login-user-service';
import { User } from '../../model/user';
import { app } from "../../server";
import { userFactory } from '../factories/user-factory';
import { biddingFactory } from '../factories/bidding-factory';
import { auctionFactory } from '../factories/auction-factory';

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

  describe("GET #getBiddingFromUser", () => {
    it("return biddings", async() => {
      let bidding = await biddingFactory({userId: user.id});

      const res = await request(app).get('/biddings/find-bidding')
                                    .set({ "x-access-token": user.token })
                                    .query({ auctionId: bidding.auctionId });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([bidding].toString());
    });

    describe("When auction not have bidding from user", () => {
      it("does not returns bidding", async() => {
        let bidding = await biddingFactory({});

        const res = await request(app).get('/biddings/find-bidding')
                                      .set({ "x-access-token": user.token })
                                      .query({ auctionId: bidding.auctionId });

        expect(res.status).toEqual(200);
        expect(res.body).toEqual([]);
      });
    });

    describe("When user not have bidding from auction", () => {
      it("does not returns bidding", async() => {
        let auction = await auctionFactory({});
        await biddingFactory({userId: user.id});

        const res = await request(app).get('/biddings/find-bidding')
                                      .set({ "x-access-token": user.token })
                                      .query({ auctionId: auction.id });

        expect(res.status).toEqual(200);
        expect(res.body).toEqual([]);
      });
    });
  });

  describe("GET #getWinner", () => {
    it("return winner from auction", async() => {
      let bidding = await biddingFactory({ userId: user.id, winner: true });

      const res = await request(app).get('/biddings/get-winner')
                                    .set({ "x-access-token": user.token })
                                    .query({ auctionId: bidding.auctionId });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual(bidding.toString());
    });
  });
});
