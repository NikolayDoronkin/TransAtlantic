import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WarehouseItem } from "../domain/model/warehouse/warehouse.item";
import { Warehouse } from "../domain/model/warehouse/warehouse";
import { Application } from "../domain/model/application/application";
import { WarehouseService } from "../service/warehouse.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Warehouse, WarehouseItem, Application])
	],
	controllers: [],
	providers: [WarehouseService],
	exports: []
})
export class WarehouseModule {
}
