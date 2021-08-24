import { Factory } from "./typeorm-factory/Factory";
import faker from 'faker/locale/pt_BR';
import { DonationCategory } from "../../model/donationCategory";

export const donationCategory01 = new Factory(DonationCategory)
    .attr("id", faker.datatype.uuid())
    .attr("donation_object_id", "")
    .attr("donation_category_id", "")
