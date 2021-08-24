import connection from "../../database/connection";
import { Category } from "../../model/category";
import { CategoryUseCase } from "../../use-cases/category-use-case";
import { category01 } from "../factories/category-factory";

describe("Category", () => {
  let categoryUseCase: CategoryUseCase;
  let category: Category;

  beforeAll(async () => {
    await connection.create();
    categoryUseCase = new CategoryUseCase();
    category = category01.build();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("Create Category", () => {
    it("create new Category", async () => {
      const newCategory = await categoryUseCase.create(category);
      expect(newCategory).toMatchObject(category);
    });
  });
});
