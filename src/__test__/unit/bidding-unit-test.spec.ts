import connection from "../../database/connection";
import { Bidding } from "../../model/bidding";
import { BiddingUseCase } from "../../use-cases/bidding-use-case";
import { auction01 } from "../factories/auction-factory";
import { bidding01 } from "../factories/bidding-factory";
import { cityCuritiba } from "../factories/city-factory";
import { donation01 } from "../factories/donation-object-factory";
import { roleAdmin } from "../factories/role-factory";
import { stateParana } from "../factories/state-factory";
import { user01 } from "../factories/user-factory";

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
    const city = await cityCuritiba.create({ stateId: (await stateParana.create()).id });
    const user = await user01.create({ roleId: (await roleAdmin.create()).id, cityId: city.id });
    const auction = await auction01.create({ donationObjectId: (await donation01.create()).id, userId: user.id });
    bidding = bidding01.build({ userId: user.id, auctionId: auction.id });
  });

  describe("Create bidding", () => {
    it("create bidding", async () => {
      const newBidding = await biddingUseCase.create(bidding);
      expect(newBidding).toMatchObject(bidding);
    });
  });
});
