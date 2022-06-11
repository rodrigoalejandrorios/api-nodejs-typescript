import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

import { ProductDTO } from "../dto/product.dto";

export class ProductMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  productValidator(req: Request, res: Response, next: NextFunction) {
    const { productName, description, category, price } = req.body;

    const valid = new ProductDTO();
    valid.productName = productName;
    valid.description = description;
    valid.category = category;
    valid.price = price;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
