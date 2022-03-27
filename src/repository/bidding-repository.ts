import { EntityRepository, getRepository, Repository } from "typeorm";
import { Bidding } from "../model/bidding";

@EntityRepository(Bidding)
class BiddingRepository extends Repository<Bidding> {
  async createAndSave(bidding: Bidding): Promise<Bidding> {
    const newBidding = this.create(bidding);
    await this.save(newBidding);
    return newBidding;
  }
}

export { BiddingRepository };
