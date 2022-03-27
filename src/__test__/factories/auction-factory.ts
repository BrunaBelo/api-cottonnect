import { genericFactory } from "../utils/genericFactory";
import { donationFactory } from "./donation-object-factory";
import { Auction } from "../../model/auction";
import faker from 'faker/locale/pt_BR';
import { userFactory } from "./user-factory";

export const auctionFactory = async(auctionData, save = true): Promise<Auction> => {
  const defaultAuction =  {
    closingDate: faker.date.future(),
    status: "closed",
    donationObjectId: null,
    userId: null
  };

  if(!auctionData.donationObjectId) {
    const donationObject = await donationFactory({});
    auctionData.donationObjectId = donationObject.id;
  }

  if(!auctionData.userId) {
    const user = await userFactory({});
    auctionData.userId = user.id;
  }

  auctionData = {
    ...defaultAuction,
    ...auctionData
  }

  const auction = await genericFactory(Auction, auctionData, save);
  return auction as Auction;
}
