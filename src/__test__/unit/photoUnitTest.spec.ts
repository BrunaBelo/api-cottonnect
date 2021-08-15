import "../../database/connection";
import connection from "../../database/connection";
import { DonationObject } from "../../model/donationObject";
import { DonationObjectUseCase } from "../../use-cases/donationObjectUseCase";
import { PhotoUseCase } from "../../use-cases/photoUseCase";
import { donation01 } from "../factories/donationObjectFactory";
import { photo01 } from "../factories/photoFactory";

let photoUseCase: PhotoUseCase;
let donationObjectUseCase: DonationObjectUseCase;
let donationObject: DonationObject
const photo = photo01

describe("Create Photo", () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await connection.clear();
        photoUseCase = new PhotoUseCase();
        donationObjectUseCase = new DonationObjectUseCase();
        donationObject = await donationObjectUseCase.create(donation01)
    });

    it("create new Photo", async () => {
        photo.donation_object_id = donationObject.id
        const newPhoto = await photoUseCase.create(photo);
        expect(newPhoto).toMatchObject(photo);
    });
});
