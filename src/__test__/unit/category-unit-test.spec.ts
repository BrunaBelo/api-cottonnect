import { getCustomRepository } from "typeorm";
import connection from "../../database/connection";
import { CategoryRepository } from "../../repository/category-repository";
import CreateService from "../../service/category/create-service";
import { categoryFactory } from "../factories/category-factory";

describe("Category", () => {
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    await connection.create();
    categoryRepository = getCustomRepository(CategoryRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create category", () => {
    it("create new Category", async () => {
      let newCategory = await categoryFactory({}, false);
      newCategory = await new CreateService(newCategory).run();
      expect(await categoryRepository.findOne(newCategory.id)).toMatchObject(newCategory);
    });
  });

  describe("Get categories", () => {
    it("returns all categories", async () => {
      let category01 = await categoryFactory({});
      let category02 = await categoryFactory({});

      const allCategories = await categoryRepository.find();

      expect(allCategories).toContainEqual(category01);
      expect(allCategories).toContainEqual(category02);
    });
  });
});
