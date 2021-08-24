import connection from "../../database/connection";
import { Photo } from "../../model/photo";
import { PhotoUseCase } from "../../use-cases/photoUseCase";
import { donation01 } from "../factories/donationObjectFactory";
import { photo01 } from "../factories/photoFactory";

describe("Photo", () => {
  let photoUseCase: PhotoUseCase;
  let photo: Photo;

  beforeAll(async () => {
    await connection.create();
    photoUseCase = new PhotoUseCase();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    photo = photo01.build({ donation_object_id: (await donation01.create()).id })
  });

  describe("Create Photo", () => {
    it("create new Photo", async () => {
      const newPhoto = await photoUseCase.create(photo);
      expect(newPhoto).toMatchObject(photo);
    });
  });
});
