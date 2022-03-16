import { Request, Response } from "express";
import { AuctionUseCase } from "../use-cases/auction-use-case";
import { DonationObjectUseCase } from "../use-cases/donation-object-use-case";

class DonationObjectController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description, photos, categories, closingDate } = request.body;

    const DonationObjectUserCase = new DonationObjectUseCase();
    const newAuctionUseCase = new AuctionUseCase();

    const newDonationObject = await DonationObjectUserCase.create({
      title,
      description,
      status: 'open',
      photos
    });

    await newAuctionUseCase.create({
      closingDate: new Date(closingDate),
      donationObjectId: newDonationObject.id,
      userId: request["user"]["user_id"],
      status: 'open'
    })
    return response.status(201).json(newDonationObject);
  }
}
export { DonationObjectController };
