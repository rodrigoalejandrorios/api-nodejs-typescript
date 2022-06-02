import { RoleType } from "../../user/dto/user.dto";

export interface PayloadToken {
  role: RoleType;
  sub: string;
}
