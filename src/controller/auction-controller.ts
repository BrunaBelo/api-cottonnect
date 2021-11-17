import { Request, Response } from "express";

import { Auction } from "../model/auction";
import { AuctionUseCase } from "../use-cases/auction-use-case";

class AuctionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { closingData, userId, donationObjectId }: Auction = request.body;

    const AuctionUserCase = new AuctionUseCase();

    const newAuction = await AuctionUserCase.create({ closingData, userId, donationObjectId });
    return response.status(201).json(newAuction);
  }
}
export { AuctionController };
