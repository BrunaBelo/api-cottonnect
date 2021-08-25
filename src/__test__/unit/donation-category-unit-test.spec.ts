import connection from "../../database/connection";
import { DonationCategory } from "../../model/donation-category";
import { DonationCategoryUseCase } from "../../use-cases/donation-category-use-case";
import { category01 } from "../factories/category-factory";
import { donationCategory01 } from "../factories/donation-category-factory";
import { donation01 } from "../factories/donation-object-factory";

describe("Donation Category", () => {
  let donationCategoryUseCase: DonationCategoryUseCase;
  let donationCategory: DonationCategory;

  beforeAll(async () => {
    await connection.create();
    donationCategoryUseCase = new DonationCategoryUseCase();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    const donation = await donation01.create();
    const category = await category01.create();
    donationCategory = donationCategory01.build({
      donationObjectId: donation.id,
      donationCategoryId: category.id
    });
  });

  describe("Create Donation Category", () => {
    it("create new Donation Category", async () => {
      const newDonationCategory = await donationCategoryUseCase.create(donationCategory);
      expect(newDonationCategory).toMatchObject(donationCategory);
    });
  });
});
