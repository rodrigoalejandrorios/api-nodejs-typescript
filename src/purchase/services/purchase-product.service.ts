import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";
import { PurchaseProductEntity } from "../entitites/purchases-products.entity";
export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor() {
    super(PurchaseProductEntity);
  }

  async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
    return (await this.execRepository).find();
  }
  async findPurchaseProductById(
    id: string
  ): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }
  async createPurchaseProduct(
    body: PurchaseProductDTO
  ): Promise<PurchaseProductEntity> {
    return (await this.execRepository).save(body);
  }
  async deletePurchaseProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  async updatePurchaseProduct(
    id: string,
    infoUpdate: PurchaseProductDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
