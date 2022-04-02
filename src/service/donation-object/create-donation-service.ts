import { getCustomRepository } from "typeorm"
import { DonationObject } from "../../model/donation-object"
import { DonationObjectRepository } from "../../repository/donation-object-repository"
import CreatePhotoService from "../photos/create-photo-service"
import savePhotos from "../cloudinary/savePhoto";
import { CategoryRepository } from "../../repository/category-repository"

class CreateDonationService {
  private repository: DonationObjectRepository;
  private categoryRepository: CategoryRepository;

  constructor(private requestParams, private files: Express.Multer.File[]) {
    this.requestParams = requestParams;
    this.files = files;
    this.repository = getCustomRepository(DonationObjectRepository);
    this.categoryRepository = getCustomRepository(CategoryRepository);
  }

  async run(): Promise<DonationObject>{
    const newDonationObject = await this.createDonation();

    if(newDonationObject){
      await this.savePhotos(newDonationObject);
    }

    return newDonationObject;
  }

  private async createDonation(): Promise<DonationObject> {
    const { repository, requestParams, categoryRepository } = this;
    const { title, description } = requestParams;
    let { categories } = requestParams

    categories = categories ? await categoryRepository.findByIds(categories) : [];

    const newDonationObject = await repository.createAndSave({
      title,
      description,
      status: 'open',
      categories,
    });

    return newDonationObject;
  }

  private async savePhotos(donationObject: DonationObject): Promise<void> {
    const { files } = this;
    let cloudPhotos = [];

    if(files){
      cloudPhotos = await savePhotos(files);
    }

    for await (const photo of cloudPhotos) {
      const { assetId, publicId, url } = photo;

      await new CreatePhotoService({
        url,
        assetId,
        publicId,
        type: 'image',
        donationObjectId: donationObject.id
      }).run();
    }
  }
}

export default CreateDonationService;
