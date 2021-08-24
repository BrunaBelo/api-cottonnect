import { Auction } from "../../model/auction";
import { Factory } from "./typeorm-factory/Factory";
import faker from 'faker/locale/pt_BR';

export const auction01 = new Factory(Auction)
    .attr("id", faker.datatype.uuid())
    .attr("closing_data", faker.date.future())
    .attr("donation_object_id", "")
    .attr("user_id", "")
