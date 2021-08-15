import "../../database/connection";
import connection from "../../database/connection";
import { DonationObjectUseCase } from "../../use-cases/donationObjectUseCase";
import { donation01 } from "../factories/donationObjectFactory";

let donationObjectUseCase: DonationObjectUseCase;
const donation = donation01

describe("Create Donation Object", () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await connection.clear();
        donationObjectUseCase = new DonationObjectUseCase();
    });

    it("create new Donation", async () => {
        const newDonation = await donationObjectUseCase.create(donation);
        expect(newDonation).toMatchObject(donation);
    });
});
