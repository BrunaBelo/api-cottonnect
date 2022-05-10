import { genericFactory } from "../utils/genericFactory";
import { Bidding } from "../../model/bidding";
import { userFactory } from "./user-factory";
import { auctionFactory } from "./auction-factory";
import faker from 'faker/locale/pt_BR';

export const biddingFactory = async(biddingData, save = true): Promise<Bidding> => {
  const defaultbidding =  {
    bidAmount: faker.datatype.number(),
    winner: false,
    auctionId: null,
    reject: false,
    userId: null,
    status: "valid"
  };

  if(!biddingData.auctionId) {
    const auction = await auctionFactory({});
    biddingData.auctionId = auction.id;
  }

  if(!biddingData.userId) {
    const user = await userFactory({});
    biddingData.userId = user.id;
  }

  biddingData = {
    ...defaultbidding,
    ...biddingData
  }

  const bidding = await genericFactory(Bidding, biddingData, save);
  return bidding as Bidding;
}
