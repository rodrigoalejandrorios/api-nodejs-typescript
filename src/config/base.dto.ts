import { IsDate, IsOptional, IsUUID } from "class-validator";

export class BaseDTO {
  @IsUUID()
  @IsOptional()
  id!: string;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
