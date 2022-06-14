import { IsNotEmpty } from "class-validator";

export class MailDTO {
  @IsNotEmpty()
  msg!: string;
  @IsNotEmpty()
  to!: string;
  @IsNotEmpty()
  subject!: string;
}
export class ResetMailDTO {
  @IsNotEmpty()
  to!: string;
  @IsNotEmpty()
  subject!: string;
}
