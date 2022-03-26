import { Category } from "../../model/category";
import { genericFactory } from "../utils/genericFactory";
import faker from 'faker/locale/pt_BR';

export const categoryFactory = async(categoryData, save = true): Promise<Category> => {
  const defaultcategory = { name: faker.lorem.word() } as Category;

  categoryData = {
    ...defaultcategory,
    ...categoryData
  }

  const category = await genericFactory(Category, categoryData, save);

  return category as Category;
}
