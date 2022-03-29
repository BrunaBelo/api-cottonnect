import { getCustomRepository } from "typeorm"
import { Photo } from "../../model/photo"
import { PhotoRepository } from "../../repository/photo-repositoy";

class CreatePhotoService {
  private repository: PhotoRepository;

  constructor(private photo: Photo) {
    this.photo = photo;
    this.repository = getCustomRepository(PhotoRepository);
  }

  async run(): Promise<Photo>{
    const { repository, photo } = this;

    const newPhoto = repository.createAndSave(photo);

    return newPhoto;
  }
}

export default CreatePhotoService;
