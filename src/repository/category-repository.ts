import { getRepository, Repository } from "typeorm";
import { Category } from "../model/category";

class CategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create(category: Category): Promise<Category> {
    const newCategory = this.repository.create(category);
    await this.repository.save(newCategory);
    return newCategory;
  }

  async getAll(): Promise<Category[]> {
    const allCategories = await this.repository.find({order: {
      'name': 'ASC'
    }});

    return allCategories;
  }

  async update(id: string, category: Category): Promise<Category> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<Category> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne(id);

    return category;
  }

  async findByName(name: string): Promise<Category> {
    throw new Error("Method not implemented.");
  }
}

export { CategoryRepository };
