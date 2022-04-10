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
        userId: request.user.id,
        status: 'open',
        donationObjectId: donationObject.id
      }).run();

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

  async getAuctions(request: Request, response: Response): Promise<Response> {
    const auctionRepository = getCustomRepository(AuctionRepository);
    const { cityId, categoryIds } = request.query;
    let auctions = [];

    try {
      auctions = await auctionRepository.getAuctionsFromCity(cityId as string);
    } catch (error) {
      throw new AppError(`Erro ao buscar doações ${error}`);
    }

    return response.status(200).json(auctions);
  }

  async getAuctionsDonated(request: Request, response: Response): Promise<Response> {
    const auctionRepository = getCustomRepository(AuctionRepository);
    const { categoryIds, status } = request.query;
    const { id: userId} = request.user;
    let auctions = [];

    try {
      auctions = await auctionRepository.getAuctionsDonated(userId);
    } catch (error) {
      throw new AppError(`Erro ao buscar doações ${error}`);
    }


    return response.status(200).json(auctions);
  }

  async getAuctionsWon(request: Request, response: Response): Promise<Response> {
    const auctionRepository = getCustomRepository(AuctionRepository);
    const { categoryIds, status} = request.query;
    const { id: userId} = request.user;
    let auctions = [];

    try {
      auctions = await auctionRepository.getAuctionnWon(userId);
    } catch (error) {
      console.log(`Erro ao buscar doações ${error}`)
      throw new AppError(`Erro ao buscar doações ${error}`);
    }

    return response.status(200).json(auctions);
  }
}

export { AuctionController };
