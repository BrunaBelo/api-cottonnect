import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { Photo } from "../model/photo";
import { AuctionRepository } from "../repository/auction-repository";
import { CategoryRepository } from "../repository/category-repository";
import { DonationObjectRepository } from "../repository/donation-object-repository";
import savePhotos from "../service/cloudinary/savePhoto";

class DonationObjectController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description, categories, closingDate } = request.body;

    const categoryRepository = getCustomRepository(CategoryRepository);
    const photoRepository = getRepository(Photo);
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
      const newPhoto = photoRepository.create({
        url,
        assetId,
        publicId,
        type: 'image',
        donationObjectId: newDonationObject.id
      })
      await photoRepository.save(newPhoto)
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
