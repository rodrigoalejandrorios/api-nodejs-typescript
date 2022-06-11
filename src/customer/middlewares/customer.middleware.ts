import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { CustomerDTO } from "../dto/customer.dto";

export class CustomerMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  customerValidator(req: Request, res: Response, next: NextFunction) {
    const { address, dni, user } = req.body;

    const valid = new CustomerDTO();

    valid.address = address;
    valid.dni = dni;
    valid.user = user;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
