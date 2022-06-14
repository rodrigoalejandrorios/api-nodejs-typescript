import { BaseRouter } from "../shared/router/router";
import { MailController } from "./controllers/mail.controller";
import { MailMiddleware } from "./middlewares/mail.middleware";

export class MailRouter extends BaseRouter<MailController, MailMiddleware> {
  constructor() {
    super(MailController, MailMiddleware);
  }

  routes(): void {
    this.router.post(
      "/mail/senMail",
      (req, res, next) => [this.middleware.mailValidator(req, res, next)],
      (req, res) => this.controller.getMail(req, res)
    );
    this.router.post(
      "/mail/reset-password",
      (req, res, next) => [this.middleware.resetMailValidator(req, res, next)],
      (req, res) => this.controller.resetPassword(req, res)
    );
  }
}
