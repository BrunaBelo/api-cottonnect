import { EntityRepository, getRepository, Repository } from "typeorm";
import { Bidding } from "../model/bidding";

@EntityRepository(Bidding)
class BiddingRepository extends Repository<Bidding> {
}

export { BiddingRepository };
