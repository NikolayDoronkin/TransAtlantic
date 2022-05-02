import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "../controller/app.controller";
import { AppService } from "../service/app.service";
import { AppUserModule } from "./app.user.module";
import { LoginModule } from "./login.module";
import { CustomerModule } from "./customer.module";
import { CarModule } from "./car.module";
import { AddressModule } from "./address.module";
import { ApplicationModule } from "./application.module";
import { ItemModule } from "./item.module";
import { RetailerModule } from "./retailer.module";
import { UserModule } from "./user.module";
import { WarehouseModule } from "./warehouse.module";
import { WaybillModule } from "./waybill.module";
import { WriteOffModule } from "./write.off.module";

@Module({
	imports: [
		AddressModule,
		AppUserModule,
		ApplicationModule,
		CarModule,
		CustomerModule,
		ItemModule,
		RetailerModule,
		UserModule,
		WarehouseModule,
		WaybillModule,
		WriteOffModule,
		LoginModule,
		ConfigModule.forRoot({ isGlobal: true }),

		TypeOrmModule.forRoot({
			type: "postgres",
			host: process.env.POSTGRES_HOST,
			port: parseInt(<string>process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			migrations: ["/resources/liquibase/db.changelog.xml"],
			migrationsRun: false,
			autoLoadEntities: true,
			synchronize: false
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
}
