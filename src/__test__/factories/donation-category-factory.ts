import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';
import { DonationCategory } from "../../model/donation-category";

export const donationCategory01 = new Factory(DonationCategory)
    .attr("id", faker.datatype.uuid())
    .attr("donationObjectId", "")
    .attr("donationCategoryId", "")
