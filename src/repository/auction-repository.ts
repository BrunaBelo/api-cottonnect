import { EntityRepository, getCustomRepository, Repository, SelectQueryBuilder } from "typeorm";
import { Auction } from "../model/auction";
import { BiddingRepository } from "./bidding-repository";

@EntityRepository(Auction)
class AuctionRepository extends Repository<Auction> {
  async createAndSave(auction: Auction): Promise<Auction> {
    const newAuction = this.create(auction);
    await this.save(newAuction);
    return newAuction;
  }

  async getAuctionsFromCity(cityId: string, categoryIds: []): Promise<Auction[]> {
    const baseAuctions = await this.baseQueryFindAll(cityId);

    if (categoryIds.length > 0){
      baseAuctions.where('categories.id IN (:...ids)', { ids: categoryIds })
    }

    return baseAuctions.getMany();
  }

  async baseQueryFindAll(cityId: string): Promise<SelectQueryBuilder<Auction>> {
    const auctions = await this.createQueryBuilder("auction")
                                .leftJoinAndSelect("auction.user", "user")
                                .leftJoinAndSelect("auction.biddings", "biddings")
                                .leftJoinAndSelect("auction.donationObject", "donation")
                                .leftJoinAndSelect("donation.photos", "photos")
                                .leftJoinAndSelect("donation.categories", "categories")
                                .where('auction.status = :status AND user.cityId = :cityId', { status: 'open', cityId: cityId })
    return auctions;
  }


  async getAuctionsDonated(userId: string): Promise<Auction[]> {
    const auctions = await this.find({
      relations: ['donationObject', 'donationObject.categories', 'user'],
      where: {
        userId: userId
      },
    });

    return auctions;
  }

  async getAuctionnWon(userId: string): Promise<Auction[]> {
    const biddingRepository = getCustomRepository(BiddingRepository);

    const biddings = await biddingRepository.find({
      relations: ['auction', 'auction.donationObject', 'auction.user'],
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
