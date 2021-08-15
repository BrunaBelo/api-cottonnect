import "../../database/connection";
import connection from "../../database/connection";
import { Category } from "../../model/category";
import { DonationObject } from "../../model/donationObject";
import { CategoryUseCase } from "../../use-cases/categoryUseCase";
import { DonationCategoryUseCase } from "../../use-cases/donationCategoryUseCase";
import { DonationObjectUseCase } from "../../use-cases/donationObjectUseCase";
import { category01 } from "../factories/categoryFactory";
import { donation01 } from "../factories/donationObjectFactory";

let donationObjectUseCase: DonationObjectUseCase;
let donationCategoryUseCase: DonationCategoryUseCase;
let categoryUseCase: CategoryUseCase;

let donation: DonationObject
let category: Category

describe("Create Donation Category", () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await connection.clear();
        donationObjectUseCase = new DonationObjectUseCase();
        categoryUseCase = new CategoryUseCase();
        donationCategoryUseCase = new DonationCategoryUseCase();
        donation = await donationObjectUseCase.create(donation01)
        category = await categoryUseCase.create(category01)
    });

    it("create new Donation Category", async () => {
        const donationCategory = {
            donation_object_id: donation.id,
            donation_category_id: category.id
        }
        const newDonationCategory = await donationCategoryUseCase.create(donationCategory);
        expect(newDonationCategory).toMatchObject(donationCategory);
    });
});
