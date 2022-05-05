import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "../domain/model/item/item";
import { ItemCategory } from "../domain/model/item/item.category";
import { Customer } from "../domain/model/customer/customer";
import { ItemController } from "../controller/item.controller";
import { ItemService } from "../service/item/item.service";
import { ItemConverter } from "../converter/item/item.converter";
import { Car } from "../domain/model/car/car";
import { Warehouse } from "../domain/model/warehouse/warehouse";
import { CreateItemConverter } from "../converter/item/create-item.converter";
import { CarService } from "../service/car.service";
import { CustomerService } from "../service/customer.service";
import { WarehouseService } from "../service/warehouse.service";
import { ItemCategoryService } from "../service/item/item-category.service";
import { RolePermission } from "../domain/model/user/role.permission";
import { RoleService } from "../service/role.service";
import { CustomerStatusService } from "../service/customer.status.service";
import { CustomerStatus } from "../domain/model/customer/customer.status";
import { AppUserService } from "../service/app.user.service";
import { AppUser } from "../domain/model/user/app.user";
import { UserStatusService } from "../service/user.status.service";
import { UserStatus } from "../domain/model/user/user.status";
import { MailService } from "../service/mail.service";
import { UserRole } from "../domain/model/user/user.role";
import {AddressService} from "../service/address.service";
import {Address} from "../domain/model/address/address";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Item, ItemCategory,
			Customer, CustomerStatus,
			Car,
			Warehouse,
			UserRole, RolePermission, AppUser, UserStatus, Address])
	],
	controllers: [ItemController],
	providers: [
		ItemService, ItemConverter, CreateItemConverter, ItemCategoryService,
		AppUserService, UserStatusService, RoleService,
		MailService,
		CarService,
		CustomerService, CustomerStatusService,
		WarehouseService, AddressService
	],
	exports: [CarService, AppUserService, RoleService]
})
export class ItemModule {
}
