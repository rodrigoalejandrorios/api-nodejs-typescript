import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseDTO } from "../dto/purchase.dto";

export class PurchaseMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  purchaseValidator(req: Request, res: Response, next: NextFunction) {
    const { status, paymentMethod, customer } = req.body;

    const valid = new PurchaseDTO();
    valid.status = status;
    valid.paymentMethod = paymentMethod;
    valid.customer = customer;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
