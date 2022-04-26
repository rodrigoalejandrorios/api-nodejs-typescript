import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CustomerEntity } from "../entitites/customer.entity";
import { CustomerDTO } from "../dto/customer.dto";
export class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async findAllCustomers(): Promise<CustomerEntity[]> {
    return (await this.execRepository).find();
  }
  async findCustomerById(id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }
  async createCustomer(body: CustomerDTO): Promise<CustomerEntity> {
    return (await this.execRepository).save(body);
  }
  async deleteCustomer(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  async updateCustomer(
    id: string,
    infoUpdate: CustomerDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
