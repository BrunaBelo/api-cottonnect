import { Photo } from "../model/photo";
import { PhotoRepository } from "../repository/photo-repositoy";

class PhotoUseCase {
    private repository: PhotoRepository;

    constructor() {
        this.repository = new PhotoRepository();
    }

    async create(photo: Photo): Promise<Photo> {
        const newPhoto = await this.repository.create(photo);
        return newPhoto;
    }

    async findById(id: string): Promise<Photo> {
        throw new Error("Method not implemented.");
    }

    async findByDonation(idDonation: string): Promise<Photo> {
        throw new Error("Method not implemented.");
    }
}
export { PhotoUseCase };
