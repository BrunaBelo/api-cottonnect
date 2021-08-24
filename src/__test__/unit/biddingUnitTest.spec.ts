import connection from "../../database/connection";
import { Bidding } from "../../model/bidding";
import { BiddingUseCase } from "../../use-cases/biddingUseCase";
import { auction01 } from "../factories/auctionFactory";
import { bidding01 } from "../factories/biddingfactory";
import { cityCuritiba } from "../factories/cityFactory";
import { donation01 } from "../factories/donationObjectFactory";
import { roleAdmin } from "../factories/roleFactory";
import { stateParana } from "../factories/stateFactory";
import { user01 } from "../factories/userFactory";

describe("Bidding", () => {
  let biddingUseCase: BiddingUseCase;
  let bidding: Bidding;

  beforeAll(async () => {
    await connection.create();
    biddingUseCase = new BiddingUseCase();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    const city = await cityCuritiba.create({ state_id: (await stateParana.create()).id });
    const user = await user01.create({ role_id: (await roleAdmin.create()).id, city_id: city.id });
    const auction = await auction01.create({ donation_object_id: (await donation01.create()).id, user_id: user.id });
    bidding = bidding01.build({ user_id: user.id, auction_id: auction.id });
  });

  describe("Create bidding", () => {
    it("create bidding", async () => {
      const newBidding = await biddingUseCase.create(bidding);
      expect(newBidding).toMatchObject(bidding);
    });
  });
});
