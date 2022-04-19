import { getCustomRepository } from "typeorm"
import { Auction } from "../../model/auction";
import { Bidding } from "../../model/bidding";
import { AuctionRepository } from "../../repository/auction-repository";
import { BiddingRepository } from "../../repository/bidding-repository";

class GenerateWinnerService {
  private repository: BiddingRepository;
  private auctionRepository: AuctionRepository;

  constructor(private auction: Auction) {
    this.auction = auction;
    this.repository = getCustomRepository(BiddingRepository);
    this.auctionRepository = getCustomRepository(AuctionRepository);
  }

  async run(): Promise<Auction> {
    const { auction, auctionRepository, repository } = this;

    const bidding = await this.getBidding();

    if(bidding == null || bidding.length <= 0){
      auction.status = "rejected";
      await auctionRepository.save(auction);
      return auction;
    }

    const bidWinner = bidding.reduce((bid1, bid2) => bid1 = bid1.bidAmount > bid2.bidAmount ? bid1 : bid2);
    bidWinner.winner = true;
    await repository.save(bidWinner);

    auction.status = "waiting";
    await auctionRepository.save(auction);

    return auction;
  }

  private async getBidding(): Promise<Bidding[]> {
    const { repository, auction } = this;

    const biddings = await repository.find(
      { where: { auctionId: auction.id, reject: false } }
    )

    return biddings
  }
}

export default GenerateWinnerService;

