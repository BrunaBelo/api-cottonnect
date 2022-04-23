import faker from 'faker/locale/pt_BR';
import { DonationObject } from "../../model/donation-object";
import { genericFactory } from "../utils/genericFactory";
import { categoryFactory } from "./category-factory";

export const donationFactory = async(donationData, save = true): Promise<DonationObject> => {
  const defaultdonation = {
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    categories: null,
    photos: null
  } as DonationObject;

  if(!donationData.categories){
    const category01 = await categoryFactory({});
    const category02 = await categoryFactory({});
    donationData.categories = [category01, category02];
  }

  donationData = {
    ...defaultdonation,
    ...donationData
  }

  const donation = await genericFactory(DonationObject, donationData, save);

  return donation as DonationObject;
}
