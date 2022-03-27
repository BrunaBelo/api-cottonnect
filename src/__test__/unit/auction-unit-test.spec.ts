import { getCustomRepository } from "typeorm";
import connection from "../../database/connection";
import { AuctionRepository } from "../../repository/auction-repository";
import CreateService from "../../service/auction/create-service";
import { auctionFactory } from "../factories/auction-factory";
import { biddingFactory } from "../factories/bidding-factory";

describe("Auction", () => {
  let auctionRepository: AuctionRepository;

  beforeAll(async () => {
    await connection.create();
    auctionRepository = getCustomRepository(AuctionRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create auction", () => {
    it("create new auction", async () => {
      let newAuction = await auctionFactory({}, false);
      newAuction = await new CreateService(newAuction).run();

      expect(await auctionRepository.findOne(newAuction.id)).toMatchObject(newAuction);
    });
  });

  describe("Get biddings of the auction", () => {
    it("returns all biddings", async () => {
      let newAuction = await auctionFactory({}, true);

      let bidding01 = await biddingFactory({auctionId: newAuction.id});
      let bidding02 = await biddingFactory({auctionId: newAuction.id });

      const biddings = (await auctionRepository.findOne(newAuction.id, { relations: ['biddings']})).biddings;
      expect(biddings).toEqual([bidding01, bidding02]);
    });
  });
});
