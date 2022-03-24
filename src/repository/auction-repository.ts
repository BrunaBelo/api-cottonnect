import { EntityRepository, getRepository, Repository } from "typeorm";
import { Auction } from "../model/auction";

@EntityRepository(Auction)
class AuctionRepository extends Repository<Auction> {
  async createAndSave(auction: Auction): Promise<Auction> {
    const newAuction = this.create(auction);
    await this.save(newAuction);
    return newAuction;
  }
 }

export { AuctionRepository };
