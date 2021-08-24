import { Request, Response } from "express";
import { Bidding } from "../model/bidding";
import { BiddingUseCase } from "../use-cases/bidding-use-case";

class BiddingController {
    async create(request: Request, response: Response): Promise<Response> {
        const { user_id, auction_id, bid_amount }: Bidding = request.body;

        const BiddingUserCase = new BiddingUseCase();

        const newBidding = await BiddingUserCase.create({ user_id, auction_id, bid_amount });
        return response.status(201).json(newBidding);
    }
}
export { BiddingController };
