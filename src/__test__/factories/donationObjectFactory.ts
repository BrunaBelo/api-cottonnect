import { DonationObject } from "../../model/donationObject";
import { Factory } from "./typeorm-factory/Factory";
import faker from 'faker/locale/pt_BR';

export const donation01 = new Factory(DonationObject)
    .attr("id", faker.datatype.uuid())
    .attr("title", faker.lorem.words())
    .attr("description", faker.lorem.sentence())
