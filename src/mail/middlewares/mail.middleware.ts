import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { MailDTO, ResetMailDTO } from "../dto/mail.dto";

export class MailMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  mailValidator(req: Request, res: Response, next: NextFunction) {
    const { msg, to, subject } = req.body;

    const valid = new MailDTO();
    valid.msg = msg;
    valid.to = to;
    valid.subject = subject;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }

  resetMailValidator(req: Request, res: Response, next: NextFunction) {
    const { to, subject } = req.body;

    const valid = new ResetMailDTO();
    valid.to = to;
    valid.subject = subject;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
