import { getCustomRepository } from "typeorm";
import { PhotoRepository } from "../../repository/photo-repositoy";
import { photoFactory } from "../factories/photo-factory";
import CreateService from "../../service/photos/create-service";
import connection from "../../database/connection";

describe("Photo", () => {
  let photoRepository: PhotoRepository;

  beforeAll(async () => {
    await connection.create();
    photoRepository = getCustomRepository(PhotoRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create Photo", () => {
    it("create new Photo", async () => {
      let newPhoto = await photoFactory({}, false);
      newPhoto = await new CreateService(newPhoto).run();

      expect(await photoRepository.findOne(newPhoto.id)).toMatchObject(newPhoto);
    });
  });
});
