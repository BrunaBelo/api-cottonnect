import { EntityRepository, Repository } from "typeorm";
import { Photo } from "../model/photo";
@EntityRepository(Photo)
class PhotoRepository extends Repository<Photo> {
  async createAndSave(Photo: Photo): Promise<Photo> {
    const newPhoto = this.create(Photo);
    await this.save(newPhoto);
    return newPhoto;
  }
}

export { PhotoRepository };
