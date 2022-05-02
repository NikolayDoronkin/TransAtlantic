import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WriteOffAct } from "../domain/model/write.off/write.off.act";
import { WriteOffItem } from "../domain/model/write.off/write.off.item";
import { WriteOffReason } from "../domain/model/write.off/write.off.reason";

@Module({
	imports: [
		TypeOrmModule.forFeature([WriteOffAct, WriteOffItem, WriteOffReason])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class WriteOffModule {
}
