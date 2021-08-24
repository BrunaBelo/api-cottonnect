import { Request, Response } from "express";

import { Auction } from "../model/auction";
import { AuctionUseCase } from "../use-cases/auction-use-case";

class AuctionController {
    async create(request: Request, response: Response): Promise<Response> {
        const { closing_data, user_id, donation_object_id }: Auction = request.body;

        const AuctionUserCase = new AuctionUseCase();

        const newAuction = await AuctionUserCase.create({ closing_data, user_id, donation_object_id });
        return response.status(201).json(newAuction);
    }
}
export { AuctionController };
