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

  async getAuctionsFromCity(cityId: string,
                            categoryId: string,
                            title: string,
                            userId: string,
                            page: number,
                            limit: number): Promise<object> {
    let baseAuctions = await this.baseQueryFindAll(cityId, userId);

    if (categoryId != "" && categoryId != undefined){
      baseAuctions = baseAuctions.andWhere('categories.id = :id', { id: categoryId });
    }

    if (title != "" && title != undefined){
      baseAuctions = baseAuctions.andWhere(`LOWER(donation.title) LIKE LOWER(:title)`, { title: `%${title}%` });
    }

    const totalAuctions = await baseAuctions.getCount();
    const auctions = await baseAuctions.skip((limit * page) - limit).take(limit).getMany();

    return { auctions: auctions, total: totalAuctions };
  }

  async baseQueryFindAll(cityId: string,userId: string): Promise<SelectQueryBuilder<Auction>> {
    const auctions = await this.createQueryBuilder("auction")
                                .leftJoinAndSelect("auction.user", "user")
                                .leftJoinAndSelect("auction.biddings", "biddings")
                                .leftJoinAndSelect("auction.donationObject", "donation")
                                .leftJoinAndSelect("donation.photos", "photos")
                                .leftJoinAndSelect("donation.categories", "categories")
                                .where('auction.status = :status AND auction.closingDate >= :dateToday AND user.cityId = :cityId AND user.id != :userId',
                                  { status: 'open', cityId: cityId, userId: userId, dateToday: new Date(new Date().setHours(0, 0, 0)) })
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
