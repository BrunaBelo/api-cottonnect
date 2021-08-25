import { Auction } from "../../model/auction";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const auction01 = new Factory(Auction)
    .attr("id", faker.datatype.uuid())
    .attr("closingData", faker.date.future())
    .attr("donationObjectId", "")
    .attr("userId", "")
