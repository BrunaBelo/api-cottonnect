import { Request, Response } from "express";

import { Auction } from "../model/auction";
import { AuctionUseCase } from "../use-cases/auctionUseCase";

class AuctionController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, closing_data, user_id, donation_object_id }: Auction = request.body;

        const AuctionUserCase = new AuctionUseCase();

        const newAuction = await AuctionUserCase.create({ name, closing_data, user_id, donation_object_id });
        return response.status(201).json(newAuction);
    }
}
export { AuctionController };
