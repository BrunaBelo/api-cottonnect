import { getRepository, Repository } from "typeorm";
import { Photo } from "../model/photo";

class PhotoRepository {
    private repository: Repository<Photo>;

    constructor() {
        this.repository = getRepository(Photo);
    }

    async create(Photo: Photo): Promise<Photo> {
        const newPhoto = this.repository.create(Photo);
        await this.repository.save(newPhoto);
        return newPhoto;
    }

    async delete(id: string): Promise<Photo> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Photo> {
        throw new Error("Method not implemented.");
    }

    async findByDonation(idDonation: string): Promise<Photo> {
        throw new Error("Method not implemented.");
    }
}

export { PhotoRepository };