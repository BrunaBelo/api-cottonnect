import { Request, Response } from "express";
import { Bidding } from "../model/bidding";
import { BiddingUseCase } from "../use-cases/bidding-use-case";

class BiddingController {
    async create(request: Request, response: Response): Promise<Response> {
        const { userId, auctionId, bidAmount }: Bidding = request.body;

        const BiddingUserCase = new BiddingUseCase();

        const newBidding = await BiddingUserCase.create({ userId, auctionId, bidAmount });
        return response.status(201).json(newBidding);
    }
}
export { BiddingController };
