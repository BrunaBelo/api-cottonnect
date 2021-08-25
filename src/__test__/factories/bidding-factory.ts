import { Bidding } from "../../model/bidding";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const bidding01 = new Factory(Bidding)
    .attr("id", faker.datatype.uuid())
    .attr("bidAmount", faker.datatype.number())
    .attr("auctionId", "")
    .attr("userId", "")
