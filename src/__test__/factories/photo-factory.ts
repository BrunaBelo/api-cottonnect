import { Photo } from "../../model/photo";
import { genericFactory } from "../utils/genericFactory";
import { donationFactory } from "./donation-object-factory";

export const photoFactory = async(photoData, save = true):Promise<Photo> => {
  const defaultPhoto = {
    assetId: "123456",
    publicId: "123456",
    type: "png",
    url: "url/faker",
    donationObjectId: null
   } as Photo

   if(!photoData.donationObjectId) {
    const donationObject = await donationFactory({});
    photoData.donationObjectId = donationObject.id;
  }

   photoData = {
    ...defaultPhoto,
    ...photoData
  }

  const photo = await genericFactory(Photo, photoData, save);
  return photo as Photo;
}
