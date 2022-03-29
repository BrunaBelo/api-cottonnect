import { getCustomRepository } from "typeorm"
import { DonationObject } from "../../model/donation-object"
import { DonationObjectRepository } from "../../repository/donation-object-repository"
import CreatePhotoService from "../../service/photos/create-service"
import CreateAuctionService from "../../service/auction/create-service"
import savePhotos from "../cloudinary/savePhoto";
import { CategoryRepository } from "../../repository/category-repository"

class CreateService {
  private repository: DonationObjectRepository;
  private categoryRepository: CategoryRepository;

  constructor(private requestParams, private currentUserId: string) {
    this.requestParams = requestParams;
    this.currentUserId = currentUserId;
    this.repository = getCustomRepository(DonationObjectRepository);
    this.categoryRepository = getCustomRepository(CategoryRepository);
  }

  async run(): Promise<DonationObject>{
    const newDonationObject = await this.createDonation();

    if(newDonationObject){
      await this.savePhotos(newDonationObject);
      await this.createAuction(newDonationObject);
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
    let cloudPhotos = [];

    if(this.requestParams.files){
      cloudPhotos = await savePhotos(this.requestParams.files);
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

  private async createAuction(donationObject: DonationObject): Promise<void> {
    const { requestParams, currentUserId } = this;

    await new CreateAuctionService({
      closingDate: new Date(requestParams.closingDate),
      userId: currentUserId,
      status: 'open',
      donationObjectId: donationObject.id
    }).run();
  }
}

export default CreateService;
