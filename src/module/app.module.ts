import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "../controller/app.controller";
import { AppService } from "../service/app.service";
import { AppUserModule } from "./app.user.module";
import { LoginModule } from "./login.module";
import { CustomerModule } from "./customer.module";

@Module({
	imports: [
		AppUserModule,
		LoginModule,
		CustomerModule,
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
