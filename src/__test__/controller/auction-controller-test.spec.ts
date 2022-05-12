import request from 'supertest';
import connection from "../../database/connection";
import LoginUserService from '../../service/user/login-user-service';
import { User } from '../../model/user';
import { app } from "../../server";
import { auctionFactory } from '../factories/auction-factory';
import { biddingFactory } from '../factories/bidding-factory';
import { donationFactory } from '../factories/donation-object-factory';
import { userFactory } from '../factories/user-factory';
import { getRepository, Repository } from 'typeorm';
import { Bidding } from '../../model/bidding';
import { Auction } from '../../model/auction';

describe("Auction", () => {
  let user: User;
  let biddingRepository: Repository<Bidding>;
  let auctionRepository: Repository<Auction>;
  let userRepository: Repository<User>;

  beforeAll(async() => {
    await connection.create();
    biddingRepository = getRepository(Bidding);
    auctionRepository = getRepository(Auction);
    userRepository = getRepository(User);
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
    it("create new auction", async() => {
      let donation = await donationFactory({}, false);

      const res = await request(app).post('/auctions')
                                    .set({ "x-access-token": user.token })
                                    .send({ ...donation, closingDate: new Date() });

      expect(res.status).toEqual(201);
      expect(res.body.toString()).toEqual([donation].toString());
    });

    it("don't create new auction when attrs is missing", async() => {
      let donation = await donationFactory({}, false);

      const res = await request(app).post('/auctions')
                                    .set({ "x-access-token": user.token })
                                    .send(donation);

      expect(res.status).toEqual(400);
      expect(res.body.message).toContain("Erro ao criar leilão");
    });
  });

  describe("GET #findAuction", () => {
    it("return auction", async() => {
      const auction = await auctionFactory({});

      const res = await request(app).get(`/auctions/${auction.id}`).set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual(auction.toString());
    });

    it("return empty when not finding an auction", async() => {
      const res = await request(app).get("/auctions/2f2829ec-b387-11ec-b909-0242ac120002").set({ "x-access-token": user.token });

      expect(res.status).toEqual(422);
      expect(res.body.message).toBe("Não foi possível encontrar a auction solicitada");
    });
  });

  describe("GET #getAuctions", () => {
    it("return auctions from city", async() => {
      const newUser = await userFactory({cityId: user.cityId});
      const auction01 = await auctionFactory({ userId: newUser.id });
      const auction02 = await auctionFactory({ userId: newUser.id });

      const res = await request(app).get(`/auctions`)
                                    .set({ "x-access-token": user.token })
                                    .query({ cityId: user.cityId, categoryId: "", title: ""});

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([auction01, auction02].toString());
    });

    it("do not return auctions with status not equals open", async() => {
      const auction = await auctionFactory({ userId: user.id, status: 'closed' });

      const res = await request(app).get(`/auctions`)
                                    .set({ "x-access-token": user.token })
                                    .query({ cityId: user.cityId, categoryId: "", title: ""});

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject([]);
      expect(res.body.toString()).not.toEqual([auction].toString());
    });

    it("do not return auctions from other city", async() => {
      const userOtherCity = await userFactory({});
      const userSameCity = await userFactory({cityId: user.cityId});

      const auctionSameCity = await auctionFactory({ userId: userSameCity.id });
      const auctionOtherCity = await auctionFactory({ userId: userOtherCity.id });

      const res = await request(app).get("/auctions/")
                                    .set({ "x-access-token": user.token })
                                    .query({ cityId: user.cityId, categoryId: "", title: ""});

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([auctionSameCity].toString());
      expect(res.body.toString()).not.toEqual([auctionSameCity, auctionOtherCity].toString());
    });
  });

  describe("GET #getAuctionsDonated", () => {
    it("return auctions donated by user", async() => {
      const auction01 = await auctionFactory({ userId: user.id });
      const auction02 = await auctionFactory({ userId: user.id });

      const res = await request(app).get(`/auctions/donated`)
                                    .set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([auction01, auction02].toString());
    });

    it("do not return auctions donated by other user", async() => {
      const otherUser = await userFactory({});

      const auction = await auctionFactory({ userId: user.id });
      const auctionOtherUser = await auctionFactory({ userId: otherUser.id });

      const res = await request(app).get("/auctions/donated")
                                    .set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([auction].toString());
      expect(res.body.toString()).not.toEqual([auction, auctionOtherUser].toString());
    });

    it("do not return auctions own by user", async() => {
      const otherUser = await userFactory({});

      const auction = await auctionFactory({ userId: otherUser.id });
      await biddingFactory({ userId: user.id, auctionId: auction.id, winner: true });

      const res = await request(app).get("/auctions/donated")
                                    .set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject([]);
      expect(res.body).not.toMatchObject([auction]);
    });
  });

  describe("GET #getAuctionsWon", () => {
    it("return auctions won by user", async() => {
      const otherUser = await userFactory({});

      const auction01 = await auctionFactory({ userId: otherUser.id });
      const auction02 = await auctionFactory({ userId: otherUser.id });

      await biddingFactory({ userId: user.id, auctionId: auction01.id, winner: true });
      await biddingFactory({ userId: user.id, auctionId: auction02.id, winner: true });

      const res = await request(app).get(`/auctions/won`)
                                    .set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([auction01, auction02].toString());
    });

    it("do not return auctions won by other user", async() => {
      const otherUser = await userFactory({});

      const auction01 = await auctionFactory({ userId: otherUser.id });
      const auction02 = await auctionFactory({ userId: otherUser.id });

      await biddingFactory({ userId: user.id, auctionId: auction01.id, winner: true });
      await biddingFactory({ userId: otherUser.id, auctionId: auction02.id, winner: true });


      const res = await request(app).get("/auctions/won")
                                    .set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([auction01].toString());
      expect(res.body.toString()).not.toEqual([auction01, auction02].toString());
    });

    it("do not return auctions donated by user", async() => {
      const auction = await auctionFactory({ userId: user.id });

      const res = await request(app).get(`/auctions/won`)
                                    .set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject([]);
      expect(res.body).not.toMatchObject([auction]);
    });

    it("do not return auctions do not won by user", async() => {
      const otherUser = await userFactory({});

      const auction = await auctionFactory({ userId: otherUser.id });

      await biddingFactory({ userId: user.id, auctionId: auction.id, winner: false });


      const res = await request(app).get("/auctions/won")
                                    .set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject([]);
      expect(res.body).not.toMatchObject([auction]);
    });
  });

  describe("GET #rejectAuction", () => {
    it("reject auctions by user", async() => {
      const auction = await auctionFactory({ userId: user.id });
      const bidWinner = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: true });

      const res = await request(app).get(`/auctions/reject/${auction.id}`)
                                    .set({ "x-access-token": user.token });

      const reloadBidWinner = await biddingRepository.findOne(bidWinner.id)

      expect(res.status).toEqual(200);
      expect(reloadBidWinner.reject).toEqual(true);
    });
  });

  describe("GET #acceptAuction", () => {
    describe("When transaction is success", () => {
      it("transfer coins from one account to another", async() => {
        const userOwner = await userFactory();
        const auction = await auctionFactory({ userId: userOwner.id });
        const bidWinner = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: true, bidAmount: 10 });

        const res = await request(app).get(`/auctions/accept/${auction.id}`)
                                      .set({ "x-access-token": user.token });

        const reloadAuction = await auctionRepository.findOne(auction.id)
        const reloadUserOwner = await userRepository.findOne(userOwner.id)
        const reloadUserWinner = await userRepository.findOne(user.id)

        expect(res.status).toEqual(200);
        expect(reloadUserWinner.cottonFlakes).toEqual(user.cottonFlakes - bidWinner.bidAmount);
        expect(reloadUserOwner.cottonFlakes).toEqual(userOwner.cottonFlakes + bidWinner.bidAmount);
        expect(reloadAuction.status).toEqual("success");
      });
    });
  });
});

