import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { CustomerEntity } from "../../customer/entitites/customer.entity";

export class PurchaseDTO extends BaseDTO {
  @IsNotEmpty()
  status!: StatusPurchare;

  @IsNotEmpty()
  paymentMethod!: string;

  @IsNotEmpty()
  customer!: CustomerEntity;
}

export enum StatusPurchare {
  IN_CART = "IN_CART",
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PENDDING_APPROVED = "PENDING_APPROVED",
  APPROVED = "APPROVED",
  ERROR = "ERROR",
}
