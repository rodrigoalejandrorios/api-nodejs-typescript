import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class CategoryDTO extends BaseDTO {
  @IsNotEmpty()
  categoryName!: string;

  @IsOptional()
  colorBadge?: ColorBadge;
}

export enum ColorBadge {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}
