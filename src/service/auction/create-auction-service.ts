import { getCustomRepository } from "typeorm"
import { Auction } from "../../model/auction"
import { AuctionRepository } from "../../repository/auction-repository"

class CreateAuctionService {
  private repository: AuctionRepository;

  constructor(private auction: Auction) {
    this.auction = auction;
    this.repository = getCustomRepository(AuctionRepository);
  }

  async run(): Promise<Auction> {
    const { repository, auction } = this;

    const closingDate = new Date(auction.closingDate);
    closingDate.setHours(0,0,0,0);
    auction.closingDate = closingDate;

    const newAuction = repository.createAndSave(auction);

    return newAuction;
  }
}

export default CreateAuctionService;
