import { getCustomRepository } from "typeorm"
import { Auction } from "../../model/auction"
import { AuctionRepository } from "../../repository/auction-repository"

class CreateService {
  private repository: AuctionRepository;

  constructor(private auction: Auction) {
    this.auction = auction;
    this.repository = getCustomRepository(AuctionRepository);
  }

  async run(): Promise<Auction> {
    const { repository, auction } = this;

    const newAuction = repository.createAndSave(auction);

    return newAuction;
  }
}

export default CreateService;
