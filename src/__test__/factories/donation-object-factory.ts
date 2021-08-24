import { DonationObject } from "../../model/donation-object";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const donation01 = new Factory(DonationObject)
    .attr("id", faker.datatype.uuid())
    .attr("title", faker.lorem.words())
    .attr("description", faker.lorem.sentence())
