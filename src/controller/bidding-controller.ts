import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/app-error";
import { Bidding } from "../model/bidding";
import { BiddingRepository } from "../repository/bidding-repository";

class BiddingController {
  async create(request: Request, response: Response): Promise<Response> {
    const biddingRepository = getCustomRepository(BiddingRepository);
    const { auctionId, bidAmount }: Bidding = request.body;
    let newBidding = {};

    try {
      newBidding = await biddingRepository.createAndSave({
        userId: request.user.id,
        auctionId,
        bidAmount
      });
    } catch (error) {
      throw new AppError(`Não foi possivel criar o lance ${error}`);
    }
    return response.status(201).json(newBidding);
  }

  async getBiddingFromUser(request: Request, response: Response): Promise<Response> {
    const biddingRepository = getCustomRepository(BiddingRepository);
    const { auctionId } = request.query;
    let bidding = {};

    try {
      bidding = await biddingRepository.find({ where: {
        userId: request.user.id,
        auctionId: auctionId,
      }})
    } catch (error) {
      throw new AppError(`Erro: ${error}`);
    }
    return response.status(201).json(bidding);
  }
}

export { BiddingController };
