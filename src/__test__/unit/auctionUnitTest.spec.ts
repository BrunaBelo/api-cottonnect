import connection from "../../database/connection";
import { Auction } from "../../model/auction";
import { AuctionUseCase } from "../../use-cases/auctionUseCase";
import { auction01 } from "../factories/auctionFactory";
import { cityCuritiba } from "../factories/cityFactory";
import { donation01 } from "../factories/donationObjectFactory";
import { roleAdmin } from "../factories/roleFactory";
import { stateParana } from "../factories/stateFactory";
import { user01 } from "../factories/userFactory";

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
    const city = await cityCuritiba.create({ state_id: (await stateParana.create()).id });
    const user = await user01.create({ role_id: (await roleAdmin.create()).id, city_id: city.id });
    const donation = await donation01.create();
    auction = auction01.build({ donation_object_id: donation.id, user_id: user.id });
  });

  describe("Create auction", () => {
    it("create new auction", async () => {
      const newAuction = await auctionUseCase.create(auction);
      expect(newAuction).toMatchObject(auction);
    });
  });
});
