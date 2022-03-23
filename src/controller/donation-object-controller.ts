import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Category } from "../model/category";
import { DonationObject } from "../model/donation-object";
import { Photo } from "../model/photo";
import savePhotos from "../service/cloudinary/savePhoto";
import { AuctionUseCase } from "../use-cases/auction-use-case";

class DonationObjectController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description, photos, categories, closingDate } = request.body;
    const newAuctionUseCase = new AuctionUseCase();

    const categoryRepository = getRepository(Category);
    const photoRepository = getRepository(Photo);
    const donationRepository = getRepository(DonationObject);

    //criacao de doacao
    let newDonationObject = donationRepository.create({
      title,
      description,
      status: 'open',
      categories: await categoryRepository.findByIds(categories),
    })
    newDonationObject = await donationRepository.save(newDonationObject)

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
    await newAuctionUseCase.create({
      closingDate: new Date(closingDate),
      userId: request["user"]["user_id"],
      status: 'open',
      donationObjectId: newDonationObject.id
    })

    return response.status(201).json(newDonationObject);
  }
}
export { DonationObjectController };
