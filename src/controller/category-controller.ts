import { Request, Response } from "express";
import { Category } from "../model/category";
import { CategoryUseCase } from "../use-cases/category-use-case";

class CategoryController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name }: Category = request.body;

    const CategoryUserCase = new CategoryUseCase();

    const newCategory = await CategoryUserCase.create({ name });
    return response.status(201).json(newCategory);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const CategoryUserCase = new CategoryUseCase();

    const allCategories = await CategoryUserCase.getAll();
    return response.status(200).json(allCategories);
  }
}

export { CategoryController };
