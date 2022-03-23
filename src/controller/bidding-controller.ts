import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Bidding } from "../model/bidding";
import { BiddingRepository } from "../repository/bidding-repository";

class BiddingController {
    async create(request: Request, response: Response): Promise<Response> {
      const biddingRepository = getCustomRepository(BiddingRepository);

      const { userId, auctionId, bidAmount }: Bidding = request.body;

      const newBidding = biddingRepository.create({ userId, auctionId, bidAmount });
      biddingRepository.save(newBidding)

      return response.status(201).json(newBidding);
    }
}

export { BiddingController };
