import { EntityRepository, getRepository, Repository } from "typeorm";
import { Auction } from "../model/auction";

@EntityRepository(Auction)
class AuctionRepository extends Repository<Auction> { }

export { AuctionRepository };
