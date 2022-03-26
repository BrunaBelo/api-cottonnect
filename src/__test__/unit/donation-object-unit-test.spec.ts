import { getCustomRepository } from "typeorm";
import connection from "../../database/connection";
import { DonationObjectRepository } from "../../repository/donation-object-repository";
import CreateService from "../../service/donation-object/create-service";
import { donationFactory } from "../factories/donation-object-factory";

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
      newDonation = await new CreateService(newDonation).run();

      expect(await donationRepository.findOne(newDonation.id,
        { relations: ['categories'] })).toEqual(newDonation);
    });
  });
});
