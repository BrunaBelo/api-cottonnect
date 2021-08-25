import { Request, Response } from "express";
import { Photo } from "../model/photo";
import { PhotoUseCase } from "../use-cases/photo-use-case";

class PhotoController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, type, uri, donationObjectId }: Photo = request.body;
        const photoUseCase = new PhotoUseCase();

        const newPhoto = await photoUseCase.create({ name, type, uri, donationObjectId });
        return response.status(201).json(newPhoto);
    }
}
export { PhotoController };
