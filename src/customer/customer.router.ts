import { BaseRouter } from "../shared/router/router";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerMiddleware } from "./middlewares/customer.middleware";
export class CustomerRouter extends BaseRouter<
  CustomerController,
  CustomerMiddleware
> {
  constructor() {
    super(CustomerController, CustomerMiddleware);
  }

  routes(): void {
    this.router.get("/customers", this.middleware.passAuth("jwt"), (req, res) =>
      this.controller.getCustomers(req, res)
    );
    this.router.get(
      "/customers/customer/:id",
      this.middleware.passAuth("jwt"),
      (req, res) => this.controller.getCustomerById(req, res)
    );
    this.router.post(
      "/customers/create",
      this.middleware.passAuth("jwt"),
      (req, res, next) => [this.middleware.customerValidator(req, res, next)],
      (req, res) => this.controller.createCustomer(req, res)
    );
    this.router.put(
      "/customers/update/:id",
      this.middleware.passAuth("jwt"),
      (req, res) => this.controller.updateCustomer(req, res)
    );
    this.router.delete(
      "/customers/delete/:id",
      this.middleware.passAuth("jwt"),
      (req, res) => this.controller.deleteCustomer(req, res)
    );
  }
}
