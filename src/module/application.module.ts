import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "../domain/model/application/application";
import { ApplicationItem } from "../domain/model/application/application.item";
import { ApplicationStatus } from "../domain/model/application/application.status";

@Module({
	imports: [
		TypeOrmModule.forFeature([Application, ApplicationItem, ApplicationStatus])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class ApplicationModule {
}
