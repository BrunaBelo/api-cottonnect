import { getCustomRepository } from "typeorm";
import { AuctionRepository } from "../repository/auction-repository";
import { Request, Response } from "express";
import { AppError } from "../errors/app-error";

class AuctionController {
  async findAuction(request: Request, response: Response): Promise<Response> {
    const auctionRepository = getCustomRepository(AuctionRepository);
    const { id } = request.body;

    const auction = await auctionRepository.findOne(id, {
      relations: ['donationObject', 'donationObject.photos', 'donationObject.categories']
    });

    if(!auction){
      throw new AppError("Não foi possível encontrar a auction solicitada", 422);
    }

    return response.status(200).json(auction);
  }
}

export { AuctionController };
