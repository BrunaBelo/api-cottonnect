import { DonationCategory } from "../model/donationCategory";
import { DonationCategoryRepository } from "../repository/donationCategoryRepository";

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
