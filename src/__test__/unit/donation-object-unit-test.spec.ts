import connection from "../../database/connection";
import { DonationObject } from "../../model/donation-object";
import { DonationObjectUseCase } from "../../use-cases/donation-object-use-case";
import { donation01 } from "../factories/donation-object-factory";

describe("Donation Object", () => {
  let donationObjectUseCase: DonationObjectUseCase;
  let donation: DonationObject;

  beforeAll(async () => {
    await connection.create();
    donationObjectUseCase = new DonationObjectUseCase();
    donation = donation01.build()
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create Donation Object", () => {
    it("create new Donation", async () => {
      const newDonation = await donationObjectUseCase.create(donation);
      expect(newDonation).toMatchObject(donation);
    });
  });
});

