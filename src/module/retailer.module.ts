import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Retailer } from "../domain/model/retailer/retailer";
import { RetailerWarehouse } from "../domain/model/retailer/retailer.warehouse";
import { RetailerStatus } from "../domain/model/retailer/retailer.status";

@Module({
	imports: [
		TypeOrmModule.forFeature([Retailer, RetailerWarehouse, RetailerStatus])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class RetailerModule {
}
