import connection from "../../database/connection";
import { DonationCategory } from "../../model/donationCategory";
import { DonationCategoryUseCase } from "../../use-cases/donationCategoryUseCase";
import { category01 } from "../factories/categoryFactory";
import { donationCategory01 } from "../factories/donation-category-factory";
import { donation01 } from "../factories/donationObjectFactory";

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
      donation_object_id: donation.id,
      donation_category_id: category.id
    });
  });

  describe("Create Donation Category", () => {
    it("create new Donation Category", async () => {
      const newDonationCategory = await donationCategoryUseCase.create(donationCategory);
      expect(newDonationCategory).toMatchObject(donationCategory);
    });
  });
});
