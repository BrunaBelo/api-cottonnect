import { Bidding } from "../model/bidding";
import { BiddingRepository } from "../repository/bidding-repository";

class BiddingUseCase {
    private repository: BiddingRepository;

    constructor() {
        this.repository = new BiddingRepository();
    }

    async create(bidding: Bidding): Promise<Bidding> {
        const newBidding = await this.repository.create(bidding);
        return newBidding;
    }

}
export { BiddingUseCase };
