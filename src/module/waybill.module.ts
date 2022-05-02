import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Waybill } from "../domain/model/waybill/waybill";
import { WaybillStatus } from "../domain/model/waybill/waybill.status";
import { Car } from "../domain/model/car/car";

@Module({
	imports: [
		TypeOrmModule.forFeature([Waybill, WaybillStatus, Car])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class WaybillModule {
}
