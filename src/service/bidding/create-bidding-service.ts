import { getCustomRepository } from "typeorm"
import { Bidding } from "../../model/bidding"
import { BiddingRepository } from "../../repository/bidding-repository"

class CreateBiddingService {
  private repository: BiddingRepository;

  constructor(private bidding: Bidding) {
    this.bidding = bidding;
    this.repository = getCustomRepository(BiddingRepository);
  }

  async run(): Promise<Bidding> {
    const { repository, bidding } = this;

    const newBidding = repository.createAndSave(bidding);

    return newBidding;
  }
}

export default CreateBiddingService;
