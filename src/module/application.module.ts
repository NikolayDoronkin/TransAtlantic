import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "../domain/model/application/application";
import { ApplicationItem } from "../domain/model/application/application.item";
import { ApplicationStatus } from "../domain/model/application/application.status";
import { ApplicationController } from "../controller/application.controller";
import { ApplicationService } from "../service/application.service";
import { WarehouseService } from "../service/warehouse.service";
import { Warehouse } from "../domain/model/warehouse/warehouse";
import { ApplicationConverter } from "../converter/application/application.converter";
import { UserConverter } from "../converter/user/user.converter";
import { RetailerWarehouseConverter } from "../converter/retailer-warehouse.converter";
import { WarehouseConverter } from "../converter/warehouse/warehouse.converter";
import { AddressConverter } from "../converter/address.converter";
import { WarehouseItemService } from "../service/warehouse.item.service";
import { WarehouseItem } from "../domain/model/warehouse/warehouse.item";
import { Address } from "../domain/model/address/address";
import { CreateAddressConverter } from "../converter/create.address.converter";
import { CreateWarehouseConverter } from "../converter/warehouse/create.warehouse.converter";

@Module({
	imports: [
		TypeOrmModule.forFeature([Application, ApplicationItem, ApplicationStatus, Warehouse, WarehouseItem, Address])
	],
	controllers: [ApplicationController],
	providers: [
		AddressConverter,
		ApplicationService,
		WarehouseService,
		ApplicationController,
		ApplicationConverter,
		UserConverter,
		RetailerWarehouseConverter,
		WarehouseConverter,
		WarehouseItemService,
		CreateWarehouseConverter,
		CreateAddressConverter
	],
	exports: [WarehouseService]
})
export class ApplicationModule {
}
