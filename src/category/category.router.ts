import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";
import { CategoryMiddleware } from "./middlewares/category.middleware";
export class CategoryRouter extends BaseRouter<
  CategoryController,
  CategoryMiddleware
> {
  constructor() {
    super(CategoryController, CategoryMiddleware);
  }

  routes(): void {
    this.router.get("/categories", (req, res) =>
      this.controller.getCategories(req, res)
    );
    this.router.get("/categories/category/:id", (req, res) =>
      this.controller.getCategoryById(req, res)
    );
    this.router.post(
      "/categories/create",
      (req, res, next) => [this.middleware.categoryValidator(req, res, next)],
      (req, res) => this.controller.createCategory(req, res)
    );
    this.router.put("/categories/update/:id", (req, res) =>
      this.controller.updateCategory(req, res)
    );
    this.router.delete("/categories/delete/:id", (req, res) =>
      this.controller.deleteCategory(req, res)
    );
  }
}
