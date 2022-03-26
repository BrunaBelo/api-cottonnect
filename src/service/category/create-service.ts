import { getCustomRepository } from "typeorm"
import { AppError } from "../../errors/app-error"
import { Category } from "../../model/category"
import { CategoryRepository } from "../../repository/category-repository"

class CreateService {
  private repository: CategoryRepository;

  constructor(private category: Category) {
    this.category = category;
    this.repository = getCustomRepository(CategoryRepository);
  }

  async run(): Promise<Category> {
    const { repository, category } = this;

    const existCategory = await repository.findOne({ where: { name: category.name } });

    if (existCategory) {
      throw new AppError(`O nome ${category.name} já está em uso`);
    }

    const newCategory = repository.createAndSave(category);

    return newCategory;
  }
}

export default CreateService;
