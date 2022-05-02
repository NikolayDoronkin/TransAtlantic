import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WarehouseItem } from "../domain/model/warehouse/warehouse.item";
import { Warehouse } from "../domain/model/warehouse/warehouse";
import { Application } from "../domain/model/application/application";

@Module({
	imports: [
		TypeOrmModule.forFeature([Warehouse, WarehouseItem, Application])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class WarehouseModule {
}
