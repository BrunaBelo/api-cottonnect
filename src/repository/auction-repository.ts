import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Auction } from "../model/auction";
import { BiddingRepository } from "./bidding-repository";

@EntityRepository(Auction)
class AuctionRepository extends Repository<Auction> {
  async createAndSave(auction: Auction): Promise<Auction> {
    const newAuction = this.create(auction);
    await this.save(newAuction);
    return newAuction;
  }

  async getAuctionsFromCity(cityId: string): Promise<Auction[]> {
    const auctions = await this.find({
      relations: ['donationObject',
                  'donationObject.photos',
                  'donationObject.categories',
                  'user'],
      where: {
        status: 'open',
        user: {
          cityId: cityId
        },
      },
    });
    return auctions;
  }

  async getAuctionsDonated(userId: string): Promise<Auction[]> {
    const auctions = await this.find({
      relations: ['donationObject', 'donationObject.categories'],
      where: {
        userId: userId
      },
    });

    return auctions;
  }

  async getAuctionnWon(userId: string): Promise<Auction[]> {
    const biddingRepository = getCustomRepository(BiddingRepository);

    const biddings = await biddingRepository.find({
      relations: ['auction', 'auction.donationObject'],
      where: {
        userId: userId,
        winner: true
      },
    });

    const auctions = biddings.map(bidding => {
      return bidding.auction;
    })

    return auctions;
  }
 }

export { AuctionRepository };
