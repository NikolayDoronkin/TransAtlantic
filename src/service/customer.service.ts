import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Customer } from "../domain/model/customer/customer";
import { AppUser } from "../domain/model/user/app.user";
import { RoleService } from "./role.service";
import { CustomerStatusService } from "./customer.status.service";
import { AppUserService } from "./app.user.service";
import { UserStatusService } from "./user.status.service";

@Injectable()
export class CustomerService {

	private readonly ADMIN_ROLE = "admin";
	private readonly ACTIVE_STATUS = "active";
	private readonly DISABLED_STATUS = "disabled";

	constructor(
		@InjectRepository(Customer)
		private readonly customerRepository: Repository<Customer>,
		private readonly roleService: RoleService,
		private readonly customerStatusService: CustomerStatusService,
		private readonly userService: AppUserService,
		private readonly userStatusService: UserStatusService
	) {
	}

	async getAll(): Promise<Customer[]> {
		return await this.customerRepository.find({ relations: ["status"] });
	}

	async getById(id: number): Promise<Customer> {
		return await this.customerRepository.findOne({
			where: {
				id: id
			}
		});
	}

	async create(customer: Customer, user: AppUser): Promise<AppUser> {
		const customerStatus = await this.customerStatusService.findByName(this.ACTIVE_STATUS);
		customer.status = customerStatus;
		customer.statusId = customerStatus.id;
		const savedCustomer = await this.customerRepository.save(customer);

		user.customer = savedCustomer;
		user.customerId = savedCustomer.id;
		const role = await this.roleService.findByName(this.ADMIN_ROLE);
		user.role = role;
		user.roleId = role.id;

		return this.userService.buildAnsSaveUser(user);
	}

	async disableCustomers(customerIds: number[]) {
		await this.changeStatus(customerIds, this.DISABLED_STATUS);
	}

	async enableCustomers(customerIds: number[]) {
		await this.changeStatus(customerIds, this.ACTIVE_STATUS);
	}

	private async changeStatus(customerIds: number[], status: string) {
		const customers = await this.customerRepository.find({ relations: ["status"], where: { id: In(customerIds) } });
		const customerStatus = await this.customerStatusService.findByName(status);
		customers.forEach(customer => customer.status = customerStatus);
		await this.customerRepository.save(customers);

		const users = await this.userService.getByCustomerIds(customerIds);
		const userStatus = await this.userStatusService.findByName(status);
		users.forEach(user => user.status = userStatus);
		await this.userService.updateAll(users);
	}
}
