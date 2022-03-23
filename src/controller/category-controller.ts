import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Category } from "../model/category";
import { CategoryRepository } from "../repository/category-repository";

class CategoryController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name }: Category = request.body;

    const categoryRepository = getCustomRepository(CategoryRepository);

    const newCategory = await categoryRepository.createAndSave({ name });
    return response.status(201).json(newCategory);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const allCategories = await categoryRepository.getAll();
    return response.status(200).json(allCategories);
  }
}

export { CategoryController };
