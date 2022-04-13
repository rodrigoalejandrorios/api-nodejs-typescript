import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class CategoryDTO extends BaseDTO {
  @IsNotEmpty()
  categoryName!: string;
}
