import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WarehouseItem } from "../domain/model/warehouse/warehouse.item";
import { Warehouse } from "../domain/model/warehouse/warehouse";
import { Application } from "../domain/model/application/application";
import { WarehouseService } from "../service/warehouse.service";
import { WarehouseConverter } from "../converter/warehouse/warehouse.converter";
import { CreateWarehouseConverter } from "../converter/warehouse/create.warehouse.converter";
import { WarehouseController } from "../controller/warehouse.controller";
import { AddressModule } from "./address.module";
import { AddressConverter } from "../converter/address.converter";
import { CreateAddressConverter } from "../converter/create.address.converter";
import { WarehouseItemService } from "../service/warehouse.item.service";
import { Address } from "../domain/model/address/address";

@Module({
	imports: [
		TypeOrmModule.forFeature([Warehouse, WarehouseItem, Application, Address]),
		AddressModule
	],
	controllers: [WarehouseController],
	providers: [
		WarehouseService,
		WarehouseConverter,
		CreateWarehouseConverter,
		AddressConverter,
		CreateAddressConverter,
		WarehouseItemService
	],
	exports: []
})
export class WarehouseModule {
}
