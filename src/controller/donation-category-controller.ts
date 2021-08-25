import { Request, Response } from "express";

import { DonationCategory } from "../model/donation-category";
import { DonationCategoryUseCase } from "../use-cases/donation-category-use-case";

class DonationCategoryController {
    async create(request: Request, response: Response): Promise<Response> {
        const { donationObjectId, donationCategoryId }: DonationCategory = request.body;

        const donationCategoryUserCase = new DonationCategoryUseCase();

        const newDonationCategory = await donationCategoryUserCase.create({ donationObjectId, donationCategoryId });
        return response.status(201).json(newDonationCategory);
    }
}
export { DonationCategoryController };
