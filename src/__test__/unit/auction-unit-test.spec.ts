import connection from "../../database/connection";
import { Auction } from "../../model/auction";
import { AuctionUseCase } from "../../use-cases/auction-use-case";
import { auction01 } from "../factories/auction-factory";
import { cityCuritiba } from "../factories/city-factory";
import { donation01 } from "../factories/donation-object-factory";
import { roleAdmin } from "../factories/role-factory";
import { stateParana } from "../factories/state-factory";
import { user01 } from "../factories/user-factory";

describe("Auction", () => {
  let auctionUseCase: AuctionUseCase;
  let auction: Auction;

  beforeAll(async () => {
    await connection.create();
    auctionUseCase = new AuctionUseCase();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    const city = await cityCuritiba.create({ stateId: (await stateParana.create()).id });
    const user = await user01.create({ roleId: (await roleAdmin.create()).id, cityId: city.id });
    const donation = await donation01.create();
    auction = auction01.build({ donationObjectId: donation.id, userId: user.id });
  });

  describe("Create auction", () => {
    it("create new auction", async () => {
      const newAuction = await auctionUseCase.create(auction);
      expect(newAuction).toMatchObject(auction);
    });
  });
});
