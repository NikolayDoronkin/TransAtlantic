import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WarehouseItem } from "../domain/model/warehouse/warehouse.item";
import { Warehouse } from "../domain/model/warehouse/warehouse";

@Module({
	imports: [
		TypeOrmModule.forFeature([Warehouse, WarehouseItem])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class WarehouseModule {
}
