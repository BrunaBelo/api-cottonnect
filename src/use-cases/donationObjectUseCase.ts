import { DonationObject } from "../model/donationObject";
import { DonationObjectRepository } from "../repository/donationObjectRepository";

class DonationObjectUseCase {
    private repository: DonationObjectRepository;

    constructor() {
        this.repository = new DonationObjectRepository();
    }

    async create(donationObject: DonationObject): Promise<DonationObject> {
        const newDonationObject = await this.repository.create(donationObject);
        return newDonationObject;
    }

    async findById(id: string): Promise<DonationObject> {
        throw new Error("Method not implemented.");
    }

    async findByTitle(title: string): Promise<DonationObject> {
        throw new Error("Method not implemented.");
    }
}
export { DonationObjectUseCase };
