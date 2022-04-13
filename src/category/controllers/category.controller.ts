import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService()
  ) {}
  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAllCategoties();
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.updateCategory(id, req.body);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.deleteCategory(id);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
}
