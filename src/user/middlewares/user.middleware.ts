import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { UserService } from "../services/user.service";

export class UserMiddleware extends SharedMiddleware {
  constructor(private readonly userService: UserService = new UserService()) {
    super();
  }
  userValidator(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, username, email, password, city, province, role } =
      req.body;

    const valid = new UserDTO();

    valid.name = name;
    valid.lastname = lastname;
    valid.username = username;
    valid.email = email;
    valid.password = password;
    valid.city = city;
    valid.province = province;
    valid.role = role;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }

  compareIdUser(req: Request, res: Response, next: NextFunction) {
    const paramId = req.params.id;
    const headerToken = req.headers.authorization;
    if (headerToken) {
      const info = jwt.decode(headerToken.split(" ")[1]);
      if (info!.sub === paramId) {
        next();
      } else {
        this.httpResponse.Unauthorized(
          res,
          "El usuario no coincide con tus credenciales"
        );
      }
    }
  }
  async compareIdsPassword(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    if (token) {
      const info: any = jwt.decode(token);
      console.log(info);
      if (info!.sub) {
        const user = await this.userService.findUserById(`${info!.sub}`);
        if (user !== null) {
          const currentDate = new Date();
          const expiresDate = new Date(info!.exp);
          if (+expiresDate >= +currentDate / 1000) {
            next();
          } else {
            this.httpResponse.Unauthorized(res, "El token esta vencido");
          }
        }
      } else {
        this.httpResponse.Unauthorized(
          res,
          "El usuario no puede cambiar el password"
        );
      }
    }
  }

  // async compareIdByParams(req: Request, res: Response, next: NextFunction) {
  //   const { token } = req.params;
  //   if (token) {
  //     const info = jwt.decode(token);
  //     console.log(info);
  //     if (info!.sub) {
  //       const user = await this.userService.findUserById(`${info!.sub}`);
  //       if (user !== null) {
  //         next();
  //       }
  //     } else {
  //       this.httpResponse.Unauthorized(
  //         res,
  //         "El usuario no puede cambiar el password"
  //       );
  //     }
  //   }
  // }
}
