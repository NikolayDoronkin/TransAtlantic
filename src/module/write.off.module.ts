import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WriteOffAct } from "../domain/model/write.off/write.off.act";
import { WriteOffItem } from "../domain/model/write.off/write.off.item";
import { WriteOffReason } from "../domain/model/write.off/write.off.reason";
import {WriteOffActController} from "../controller/write-off-act.controller";
import {WriteOffService} from "../service/write-off.service";
import {WarehouseDispatcherService} from "../service/warehouse.dispatcher.service";
import {WarehouseService} from "../service/warehouse.service";
import {ItemService} from "../service/item/item.service";
import {WriteOffItemService} from "../service/write-off.item.service";
import {WarehouseDispatcher} from "../domain/model/warehouse/warehouse.dispatcher";
import {Warehouse} from "../domain/model/warehouse/warehouse";
import {Item} from "../domain/model/item/item";
import {CarService} from "../service/car.service";
import {CustomerService} from "../service/customer.service";
import {ItemCategoryService} from "../service/item/item-category.service";
import {ItemCategory} from "../domain/model/item/item.category";
import {Car} from "../domain/model/car/car";
import {Customer} from "../domain/model/customer/customer";
import {RoleService} from "../service/role.service";
import {UserRole} from "../domain/model/user/user.role";
import {CustomerStatus} from "../domain/model/customer/customer.status";
import {CustomerStatusService} from "../service/customer.status.service";
import {AppUserService} from "../service/app.user.service";
import {AppUser} from "../domain/model/user/app.user";
import {UserStatusService} from "../service/user.status.service";
import {UserStatus} from "../domain/model/user/user.status";
import {MailService} from "../service/mail.service";
import {WriteOffActResponseConverter} from "../converter/write-off/write-off-act.response.converter";
import {WriteOffActCreateRequestConverter} from "../converter/write-off/write-off-act-create.request.converter";
import {WriteOffReasonService} from "../service/write-off.reason.service";
import {WarehouseItem} from "../domain/model/warehouse/warehouse.item";
import {WarehouseItemService} from "../service/warehouse.item.service";
import {WriteOffItemCreateConverter} from "../converter/write-off/write-off-item-create.converter";
import {Address} from "../domain/model/address/address";
import {Application} from "../domain/model/application/application";
import {WarehouseConverter} from "../converter/warehouse/warehouse.converter";
import {CreateWarehouseConverter} from "../converter/warehouse/create.warehouse.converter";
import {CreateAddressConverter} from "../converter/create.address.converter";

@Module({
	imports: [
		TypeOrmModule.forFeature([WriteOffAct, WriteOffItem, WriteOffReason, Address,
			WarehouseDispatcher, Warehouse, Item, ItemCategory, Car, Customer, UserRole,
			CustomerStatus, AppUser, UserStatus, Application,
			WriteOffReason, WarehouseItem])
	],
	controllers: [WriteOffActController],
	providers: [WriteOffService, WarehouseDispatcherService, WarehouseConverter, CreateWarehouseConverter,
		WarehouseService, ItemService, WriteOffItemService, CarService, CreateAddressConverter,
		CustomerService, ItemCategoryService, RoleService, CustomerStatusService,
		AppUserService, UserStatusService, MailService, WriteOffActResponseConverter, WriteOffActCreateRequestConverter,
		WriteOffReasonService, WarehouseItemService, WriteOffItemCreateConverter],
	exports: [WriteOffService]
})
export class WriteOffModule {
}
