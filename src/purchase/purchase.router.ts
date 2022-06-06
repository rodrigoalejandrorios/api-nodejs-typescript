import { BaseRouter } from "../shared/router/router";
import { PurchaseController } from "./controllers/purchase.controller";
import { PurchaseMiddleware } from "./middlewares/purchase.middleware";
export class PurchaseRouter extends BaseRouter<
  PurchaseController,
  PurchaseMiddleware
> {
  constructor() {
    super(PurchaseController, PurchaseMiddleware);
  }

  routes(): void {
    this.router.get("/purchases", (req, res) =>
      this.controller.getPurchases(req, res)
    );
    this.router.get("/purchase/:id", (req, res) =>
      this.controller.getPurchaseById(req, res)
    );
    this.router.post(
      "/createPurchase",
      (req, res, next) => [this.middleware.purchaseValidator(req, res, next)],
      (req, res) => this.controller.createPurchase(req, res)
    );
    this.router.put("/updatePurchase/:id", (req, res) =>
      this.controller.updatePurchase(req, res)
    );
    this.router.delete("/deletePurchase/:id", (req, res) =>
      this.controller.deletePurchase(req, res)
    );
  }
}
