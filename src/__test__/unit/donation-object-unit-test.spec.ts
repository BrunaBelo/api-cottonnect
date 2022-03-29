import { getCustomRepository } from "typeorm";
import connection from "../../database/connection";
import { DonationObjectRepository } from "../../repository/donation-object-repository";
import { donationFactory } from "../factories/donation-object-factory";
import { photoFactory } from "../factories/photo-factory";

describe("Donation Object", () => {
  let donationRepository: DonationObjectRepository;

  beforeAll(async () => {
    await connection.create();
    donationRepository = getCustomRepository(DonationObjectRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create Donation", () => {
    it("create new donation", async () => {
      let newDonation = await donationFactory({}, false);
      newDonation = await donationRepository.createAndSave(newDonation);

      expect(await donationRepository.findOne(newDonation.id,
        { relations: ['categories'] })).toEqual(newDonation);
    });

    it("create new donation with photos", async () => {
      let newDonation = await donationFactory({}, true);
      let photo01 = await photoFactory({donationObjectId: newDonation.id}, true);
      let photo02 = await photoFactory({donationObjectId: newDonation.id}, true);

      const photos = (await donationRepository.findOne(newDonation.id, { relations: ['photos'] })).photos;

      expect(photos).toEqual([photo01, photo02]);
    });
  });
});
