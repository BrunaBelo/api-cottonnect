import { getCustomRepository } from "typeorm";
import connection from "../../database/connection";
import { BiddingRepository } from "../../repository/bidding-repository";
import CreateBinddingService from "../../service/bidding/create-bidding-service";
import { biddingFactory } from "../factories/bidding-factory";

describe("Bidding", () => {
  let biddingRepository: BiddingRepository;

  beforeAll(async () => {
    await connection.create();
    biddingRepository = getCustomRepository(BiddingRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create bidding", () => {
    it("create bidding", async () => {
      let newBidding = await biddingFactory({}, false);
      newBidding = await new CreateBinddingService(newBidding).run();

      expect(await biddingRepository.findOne(newBidding.id)).toMatchObject(newBidding);
    });
  });
});
