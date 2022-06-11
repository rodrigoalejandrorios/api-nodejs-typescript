import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryDTO } from "../dto/category.dto";

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAllCategoties(): Promise<CategoryEntity[]> {
    return (await this.execRepository).find();
  }
  async findCategoryById(id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findCategoryWithProduct(
    categorytId: string
  ): Promise<CategoryEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.products", "products")
      .where({ id: categorytId })
      .getOne();
  }
  async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
    return (await this.execRepository).save(body);
  }
  async deleteCategory(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  async updateCategory(
    id: string,
    infoUpdate: CategoryDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
