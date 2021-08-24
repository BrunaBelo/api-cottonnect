import { DonationCategory } from "../model/donation-category";
import { DonationCategoryRepository } from "../repository/donation-category-repository";

class DonationCategoryUseCase {
    private repository: DonationCategoryRepository;

    constructor() {
        this.repository = new DonationCategoryRepository();
    }

    async create(donationCategory: DonationCategory): Promise<DonationCategory> {
        const newDonationCategory = await this.repository.create(donationCategory);
        return newDonationCategory;
    }
}
export { DonationCategoryUseCase };
