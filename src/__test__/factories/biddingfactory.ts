import { Bidding } from "../../model/bidding";
import { Factory } from "./typeorm-factory/Factory";

export const bidding01 = new Factory(Bidding)
    .attr("id", "44cd5754-5789-4c56-a2a1-64d4b4de8894")
    .attr("bid_amount", 1)
    .attr("auction_id", "")
    .attr("user_id", "")
