import { EntityRepository, getRepository, Repository } from "typeorm";
import { Category } from "../model/category";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {

  async createAndSave(category: Category): Promise<Category> {
    const newCategory = await this.create(category);
    await this.save(newCategory);
    return newCategory;
  }

  async getAll(): Promise<Category[]> {
    const allCategories = await this.find({order: {
      'name': 'ASC'
    }});

    return allCategories;
  }
}

export { CategoryRepository };
