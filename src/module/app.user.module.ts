import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppUserController } from "../controller/app.user.controller";
import { AppUserService } from "../service/app.user.service";
import { AppUser } from "../domain/model/user/app.user";
import { LoginModule } from "./login.module";
import { UserConverter } from "../converter/user/user.converter";
import { CreateUserConverter } from "../converter/user/create-user.converter";
import { UpdateUserConverter } from "../converter/user/update-user.converter";
import { UserRole } from "../domain/model/user/user.role";
import { UserStatus } from "../domain/model/user/user.status";
import { Address } from "../domain/model/address/address";
import { AddressCity } from "../domain/model/address/address.city";
import { AddressState } from "../domain/model/address/address.state";
import { CustomerStatus } from "../domain/model/customer/customer.status";
import { Customer } from "../domain/model/customer/customer";
import { RolePermission } from "../domain/model/user/role.permission";
import { UserPermission } from "../domain/model/user/user.permission";
import {UserManagementController} from "../controller/user-management.controller";
import {UserManagementResponseConverter} from "../converter/user-management/user-management.response.converter";
import {UserStatusService} from "../service/user.status.service";
import {AddressService} from "../service/address.service";
import {RoleService} from "../service/role.service";
import {MailService} from "../service/mail.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([AppUser, UserRole, UserStatus, RolePermission, UserPermission,
			Address, AddressCity, AddressState,
			Customer, CustomerStatus]),
		forwardRef(() => LoginModule)],
	controllers: [AppUserController, UserManagementController],
	providers: [AppUserService, UserConverter, CreateUserConverter, UpdateUserConverter,
				UserManagementResponseConverter, UserStatusService, AddressService, RoleService, MailService],
	exports: [AppUserService]
})
export class AppUserModule {
}
