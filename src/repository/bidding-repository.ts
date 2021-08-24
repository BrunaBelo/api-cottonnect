import { getRepository, Repository } from "typeorm";
import { Bidding } from "../model/bidding";

class BiddingRepository {
    private repository: Repository<Bidding>;

    constructor() {
        this.repository = getRepository(Bidding);
    }

    async create(bidding: Bidding): Promise<Bidding> {
        const newBidding = this.repository.create(bidding);
        await this.repository.save(newBidding);
        return newBidding;
    }

    async findById(id: string): Promise<Bidding> {
        throw new Error("Method not implemented.");
    }

    async findWinner(idAuction: string): Promise<Bidding> {
        throw new Error("Method not implemented.");
    }

    async findByAuction(idAuction: string): Promise<Bidding> {
        throw new Error("Method not implemented.");
    }
}

export { BiddingRepository };
