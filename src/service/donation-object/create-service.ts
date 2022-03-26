import { getCustomRepository } from "typeorm"
import { DonationObject } from "../../model/donation-object"
import { DonationObjectRepository } from "../../repository/donation-object-repository"

class CreateService {
  private repository: DonationObjectRepository;

  constructor(private donationObject: DonationObject){
    this.donationObject = donationObject;
    this.repository = getCustomRepository(DonationObjectRepository);
  }

  async run(): Promise<DonationObject>{
    const { repository, donationObject } = this;

    const newDonationObject = repository.createAndSave(donationObject);

    return newDonationObject;
  }
}

export default CreateService;
