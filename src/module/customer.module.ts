import { Module } from "@nestjs/common";
import { CustomerController } from "../controller/customer.controller";
import { CustomerService } from "../service/customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "../domain/model/customer/customer";
import { CustomerStatus } from "../domain/model/customer/customer.status";
import { CreateCustomerConverter } from "../converter/customer/create-customer-user.converter";
import { CreateCustomerUserConverter } from "../converter/customer/create-customer.converter";
import { CreateCustomerResponseConverter } from "../converter/customer/create-customer.response.converter";
import { AppUserService } from "../service/app.user.service";
import { CustomerStatusService } from "../service/customer.status.service";
import { RoleService } from "../service/role.service";
import { AppUser } from "../domain/model/user/app.user";
import { UserRole } from "../domain/model/user/user.role";
import { UserStatusService } from "../service/user.status.service";
import { UserStatus } from "../domain/model/user/user.status";
import { MailModule } from "./mail.module";
import { CustomerResponseConverter } from "../converter/customer/customer.response.converter";
import { RolePermission } from "../domain/model/user/role.permission";
import {Address} from "../domain/model/address/address";
import {AddressService} from "../service/address.service";

@Module({
	imports: [
		MailModule,
		TypeOrmModule.forFeature([
			Customer, CustomerStatus, CustomerStatus,
			AppUser, UserRole, UserStatus, RolePermission, Address
		])
	],
	controllers: [CustomerController],
	providers: [
		CustomerService, CreateCustomerConverter, CreateCustomerUserConverter, CreateCustomerResponseConverter, CustomerStatusService, CustomerResponseConverter,
		AppUserService, RoleService,
		UserStatusService, AddressService],
	exports: []
})
export class CustomerModule {
}
