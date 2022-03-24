import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AuctionRepository } from "../repository/auction-repository";
import { CategoryRepository } from "../repository/category-repository";
import { DonationObjectRepository } from "../repository/donation-object-repository";
import { PhotoRepository } from "../repository/photo-repositoy";
import savePhotos from "../service/cloudinary/savePhoto";

class DonationObjectController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description, categories, closingDate } = request.body;

    const categoryRepository = getCustomRepository(CategoryRepository);
    const photoRepository = getCustomRepository(PhotoRepository);
    const donationRepository = getCustomRepository(DonationObjectRepository);
    const auctionRepository = getCustomRepository(AuctionRepository);

    //criacao de doacao
    let newDonationObject = await donationRepository.createAndSave({
      title,
      description,
      status: 'open',
      categories: await categoryRepository.findByIds(categories),
    })

    //subindo fotos para cloudinary
    const cloudPhotos = await savePhotos(request.files as Express.Multer.File[])

    //criacao de fotos
    for await (const photo of cloudPhotos) {
      const { assetId, publicId, url } = photo
      await photoRepository.createAndSave({
        url,
        assetId,
        publicId,
        type: 'image',
        donationObjectId: newDonationObject.id
      })
    }

    //criacao de leilao
    await auctionRepository.createAndSave({
      closingDate: new Date(closingDate),
      userId: request["user"]["user_id"],
      status: 'open',
      donationObjectId: newDonationObject.id
    })

    return response.status(201).json(newDonationObject);
  }
}

export { DonationObjectController };
