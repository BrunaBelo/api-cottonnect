import { Category } from "../model/category";
import { CategoryRepository } from "../repository/category-repository";

class CategoryUseCase {
    private repository: CategoryRepository;

    constructor() {
        this.repository = new CategoryRepository();
    }

    async create(category: Category): Promise<Category> {
        const newCity = await this.repository.create(category);
        return newCity;
    }

    async getAll(): Promise<Category[]> {
        const allCategories = await this.repository.getAll();

        return allCategories;
    }

    async update(id: string, category: Category): Promise<Category> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }

    async findByName(name: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }
}
export { CategoryUseCase };
