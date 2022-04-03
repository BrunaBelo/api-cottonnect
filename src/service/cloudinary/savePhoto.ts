import axios from "axios";

import { IPhoto } from "../../interfaces/IPhoto"

interface IPhotoResponse {
  data: {
    asset_id: string,
    url: string,
    public_id: string
  }
}

const savePhoto = async (photo: Express.Multer.File): Promise<IPhotoResponse> => {
  const cloudName = process.env.CLOUDINARY_CLOUD
  const url = process.env.CLOUDINARY_BASEURL.replace("CLOUD_NAME", cloudName)
  const apiKey = process.env.CLOUDINARY_KEY
  const presetName = process.env.CLOUDNARY_PRESET
  let response

  try {
    response = await axios.post(url, {
      file: `data:${photo.mimetype};base64,${photo.buffer.toString('base64')}`,
      upload_preset: presetName,
      timestamp: Math.floor(new Date().getTime() / 1000),
      api_key: apiKey,
    }) as IPhotoResponse
  } catch (error) {
    console.log(error)
  }

  return response
}

const savePhotos = async(photos: Express.Multer.File[]): Promise<IPhoto[]> => {
  const result = []

  for await (const photoToUpload of photos) {
    const { data: { asset_id, public_id, url }} = await savePhoto(photoToUpload)
    result.push({ assetId: asset_id, publicId: public_id, url })
  }

  return result
}

export default savePhotos
