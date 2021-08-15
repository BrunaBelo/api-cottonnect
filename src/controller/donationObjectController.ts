import { Request, Response } from "express";

import { DonationObject } from "../model/donationObject";
import { DonationObjectUseCase } from "../use-cases/donationObjectUseCase";

class DonationObjectController {
    async create(request: Request, response: Response): Promise<Response> {
        const { title, description }: DonationObject = request.body;

        const DonationObjectUserCase = new DonationObjectUseCase();

        const newDonationObject = await DonationObjectUserCase.create({ title, description });
        return response.status(201).json(newDonationObject);
    }
}
export { DonationObjectController };
