import { getRepository, Repository } from "typeorm";
import { Auction } from "../../../model/auction";
import { Bidding } from "../../../model/bidding";
import { auctionFactory } from "../../factories/auction-factory";
import { biddingFactory } from "../../factories/bidding-factory";
import { userFactory } from "../../factories/user-factory";
import connection from "../../../database/connection";
import GenerateWinnerService from "../../../service/auction/generate-winner-service";

describe("GenerateWinnerService", () => {
  let biddingRepository: Repository<Bidding>;
  let auctionRepository: Repository<Auction>;

  beforeAll(async () => {
    await connection.create();
    biddingRepository = getRepository(Bidding);
    auctionRepository = getRepository(Auction);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("#run", () => {
    describe("when has bidding to generate winner", () => {
      it("generate new winner with bigger bid", async () => {
        const user = await userFactory({});
        let auction = await auctionFactory({ userId: user.id, user: user });

        const bid01 = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: false, bidAmount: 5, status: "valid"});
        const bid02 = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: false, bidAmount: 15, status: "valid"});
        const bid03 = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: false, bidAmount: 8, status: "valid"});

        await new GenerateWinnerService(auction).run();

        expect((await biddingRepository.findOne(bid01.id)).winner).toEqual(false);
        expect((await biddingRepository.findOne(bid02.id)).winner).toEqual(true);
        expect((await biddingRepository.findOne(bid03.id)).winner).toEqual(false);
        expect((await (auctionRepository.findOne(auction.id))).status).toEqual("waiting");
      });
    });

    describe("when has not binding to generate winner", () => {
      it("return null and set auction status to rejected", async () => {
        const user = await userFactory({});
        const auction = await auctionFactory({ userId: user.id, user: user });

        await new GenerateWinnerService(auction).run();
        expect((await (auctionRepository.findOne(auction.id))).status).toEqual("rejected");
      });
    });

    describe("when has auction whith no winners", () => {
      it("dont set to winner binding rejected", async () => {
        const user = await userFactory({});
        const auction = await auctionFactory({ userId: user.id, user: user});

        const bid01 = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: false, bidAmount: 30, reject: true});
        const bid02 = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: false, bidAmount: 15});
        const bid03 = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: false, bidAmount: 8 });

        await new GenerateWinnerService(auction).run();

        expect((await biddingRepository.findOne(bid01.id)).winner).toEqual(false);
        expect((await biddingRepository.findOne(bid02.id)).winner).toEqual(true);
        expect((await biddingRepository.findOne(bid03.id)).winner).toEqual(false);
      });
    });

    describe("when user is insufficient cottons and no more users to generate other winner", () => {
      it("set status binding to insufficientCottons and status auction to rejected", async () => {
        const user = await userFactory({ cottonFlakes: 1 });
        const auction = await auctionFactory({ userId: user.id, user: user});

        const bid01 = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: false, bidAmount: 30 });

        await new GenerateWinnerService(auction).run();

        const bid = await biddingRepository.findOne(bid01.id);
        const auctionUpdated = await auctionRepository.findOne(auction.id);

        expect(bid.winner).toEqual(false);
        expect(bid.status).toEqual("insufficientCottons");
        expect(auctionUpdated.status).toEqual("rejected");
      });
    });

    describe("when user is insufficient cottons and has more other user to generate winner", () => {
      it("set status binding to insufficientCottons and generate other user", async () => {
        const user = await userFactory({ cottonFlakes: 1 });
        const user2 = await userFactory({ cottonFlakes: 50 });
        const auction = await auctionFactory({ userId: user.id, user: user});

        const bid01 = await biddingFactory({ userId: user.id, auctionId: auction.id, winner: false, bidAmount: 30 });
        const bid02 = await biddingFactory({ userId: user2.id, auctionId: auction.id, winner: false, bidAmount: 30 });

        await new GenerateWinnerService(auction).run();

        const bid = await biddingRepository.findOne(bid01.id);
        const bid2 = await biddingRepository.findOne(bid02.id);

        expect(bid.winner).toEqual(false);
        expect(bid.status).toEqual("insufficientCottons");
        expect(bid2.winner).toEqual(true);
        expect(bid2.status).toEqual("valid");
      });
    });
  });
});

