import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "../domain/model/car/car";

@Module({
	imports: [
		TypeOrmModule.forFeature([Car])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class CarModule {
}
