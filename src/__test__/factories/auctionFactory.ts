import { Auction } from "../../model/auction";
import { Factory } from "./typeorm-factory/Factory";

export const auction01 = new Factory(Auction)
    .attr("id", "c4721895-d4a8-4162-9950-192fbcc98ad0")
    .attr("name", "Auction 01")
    .attr("closing_data", new Date())
    .attr("donation_object_id", "")
    .attr("user_id", "")
