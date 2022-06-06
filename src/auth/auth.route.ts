import { SharedMiddleware } from "../shared/middlewares/shared.middleware";
import { BaseRouter } from "../shared/router/router";
import { AuthController } from "./controllers/auth.controller";
export class AuthRoute extends BaseRouter<AuthController, SharedMiddleware> {
  constructor() {
    super(AuthController, SharedMiddleware);
  }
}
