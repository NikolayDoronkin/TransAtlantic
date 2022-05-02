import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Waybill } from "../domain/model/waybill/waybill";
import { WaybillStatus } from "../domain/model/waybill/waybill.status";

@Module({
	imports: [
		TypeOrmModule.forFeature([Waybill, WaybillStatus])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class WaybillModule {
}
