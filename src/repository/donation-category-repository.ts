import { getRepository, Repository } from "typeorm";
import { DonationCategory } from "../model/donation-category";

class DonationCategoryRepository {
    private repository: Repository<DonationCategory>;

    constructor() {
        this.repository = getRepository(DonationCategory);
    }

    async create(donationCategory: DonationCategory): Promise<DonationCategory> {
        const newDonationCategory = this.repository.create(donationCategory);
        await this.repository.save(newDonationCategory);
        return newDonationCategory;
    }
}

export { DonationCategoryRepository };
