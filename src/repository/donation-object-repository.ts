import { EntityRepository, getRepository, Repository } from "typeorm";
import { DonationObject } from "../model/donation-object";

@EntityRepository(DonationObject)
class DonationObjectRepository extends Repository<DonationObject> {
  async createAndSave(donationObject: DonationObject): Promise<DonationObject> {
    const newDonationObject = this.create(donationObject);
    await this.save(newDonationObject);
    return newDonationObject;
  }
}

export { DonationObjectRepository };
