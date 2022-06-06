import { HttpResponse } from "../response/http.response";
import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/dto/user.dto";

export class SharedMiddleware {
  constructor(public httpRespose: HttpResponse = new HttpResponse()) {}
  passAuth(type: string) {
    return passport.authenticate(type, { session: false });
  }

  checkRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RoleType.ADMIN) {
      return this.httpRespose.Unauthorized(res, "No tienes permisos");
    }
    return next();
  }
}
