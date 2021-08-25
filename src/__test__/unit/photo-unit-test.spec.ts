import connection from "../../database/connection";
import { Photo } from "../../model/photo";
import { PhotoUseCase } from "../../use-cases/photo-use-case";
import { donation01 } from "../factories/donation-object-factory";
import { photo01 } from "../factories/photo-factory";

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
    photo = photo01.build({ donationObjectId: (await donation01.create()).id })
  });

  describe("Create Photo", () => {
    it("create new Photo", async () => {
      const newPhoto = await photoUseCase.create(photo);
      expect(newPhoto).toMatchObject(photo);
    });
  });
});
