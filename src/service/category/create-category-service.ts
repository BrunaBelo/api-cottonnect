import { getCustomRepository } from "typeorm"
import { Category } from "../../model/category"
import { CategoryRepository } from "../../repository/category-repository"

class CreateCategoryService {
  private repository: CategoryRepository;

  constructor(private category: Category) {
    this.category = category;
    this.repository = getCustomRepository(CategoryRepository);
  }

  async run(): Promise<Category> {
    const { repository, category } = this;

    const newCategory = repository.createAndSave(category);

    return newCategory;
  }
}

export default CreateCategoryService;
