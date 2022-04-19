import { EntityRepository, Repository } from "typeorm";
import { Bidding } from "../model/bidding";

@EntityRepository(Bidding)
class BiddingRepository extends Repository<Bidding> {
  async createAndSave(bidding: Bidding): Promise<Bidding> {
    const newBidding = this.create(bidding);
    await this.save(newBidding);
    return newBidding;
  }

  async getWinner(auctionId: string): Promise<Bidding> {
    const bidWinner = await this.findOne({
      relations: ['user'],
      where: { auctionId: auctionId, winner: true }
    });

    return bidWinner;
  }
}

export { BiddingRepository };
