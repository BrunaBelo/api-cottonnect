import { getRepository, Repository } from "typeorm";
import { DonationObject } from "../model/donationObject";

class DonationObjectRepository {
    private repository: Repository<DonationObject>;

    constructor() {
        this.repository = getRepository(DonationObject);
    }

    async create(donationObject: DonationObject): Promise<DonationObject> {
        const newDonationObject = this.repository.create(donationObject);
        await this.repository.save(newDonationObject);
        return newDonationObject;
    }

    async findById(id: string): Promise<DonationObject> {
        throw new Error("Method not implemented.");
    }

    async findByTitle(title: string): Promise<DonationObject> {
        throw new Error("Method not implemented.");
    }
}

export { DonationObjectRepository };
