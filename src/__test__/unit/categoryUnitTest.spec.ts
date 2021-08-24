import connection from "../../database/connection";
import { CategoryUseCase } from "../../use-cases/categoryUseCase";
import { category01 } from "../factories/categoryFactory";

let category = category01
let categoryUseCase: CategoryUseCase;

describe("Create Category", () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await connection.clear();
        categoryUseCase = new CategoryUseCase();
    });

    it("create new Category", async () => {
        const newCategory = await categoryUseCase.create(category);
        expect(newCategory).toMatchObject(category);
    });
});
