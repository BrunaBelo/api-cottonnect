import { Request, Response } from "express";

import { DonationCategory } from "../model/donationCategory";
import { DonationCategoryUseCase } from "../use-cases/donationCategoryUseCase";

class DonationCategoryController {
    async create(request: Request, response: Response): Promise<Response> {
        const { donation_object_id, donation_category_id }: DonationCategory = request.body;

        const donationCategoryUserCase = new DonationCategoryUseCase();

        const newDonationCategory = await donationCategoryUserCase.create({ donation_object_id, donation_category_id });
        return response.status(201).json(newDonationCategory);
    }
}
export { DonationCategoryController };
