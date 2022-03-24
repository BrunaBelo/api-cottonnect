import { getCustomRepository } from "typeorm";
import { AuctionRepository } from "../repository/auction-repository";
import { Request, Response } from "express";

class AuctionController {
  async findAuction(request: Request, response: Response): Promise<Response> {
    const auctionRepository = getCustomRepository(AuctionRepository)
    const { id } = request.body

    const auction = await auctionRepository.findOne(id, {
      relations: ['donationObject', 'donationObject.photos', 'donationObject.categories']
    })

    return response.status(201).json(auction);
  }
}

export { AuctionController };
