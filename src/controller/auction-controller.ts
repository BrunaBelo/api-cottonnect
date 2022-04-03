import { getCustomRepository } from "typeorm";
import { AuctionRepository } from "../repository/auction-repository";
import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import CreateAuctionService from "../service/auction/create-auction-service";
import CreateDonationService from "../service/donation-object/create-donation-service";

class AuctionController {
  async create(request: Request, response: Response): Promise<Response> {
    let newAuction = null;
    const { closingDate } = request.body;
    const { files } = request;

    try {
      const donationObject = await new CreateDonationService(request.body, files as Express.Multer.File[]).run();

      newAuction = await new CreateAuctionService({
        closingDate: new Date(closingDate),
        userId: request["user"]["user_id"],
        status: 'open',
        donationObjectId: donationObject.id
      }).run();

      console.log('asasasasa', newAuction)
    } catch (error) {
      throw new AppError(`Erro ao criar leilão ${error}`, 400);
    }

    return response.status(201).json(newAuction);
  }

  async findAuction(request: Request, response: Response): Promise<Response> {
    const auctionRepository = getCustomRepository(AuctionRepository);
    const { id } = request.params;

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
