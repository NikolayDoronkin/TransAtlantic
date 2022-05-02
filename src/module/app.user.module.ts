import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppUserController } from "../controller/app.user.controller";
import { AppUserService } from "../service/app.user.service";
import { AppUser } from "../domain/user/app.user";
import { LoginModule } from "./login.module";
import { UserConverter } from "../converter/user/user.converter";
import { CreateUserConverter } from "../converter/user/create-user.converter";
import { UpdateUserConverter } from "../converter/user/update-user.converter";

@Module({
	imports: [
		TypeOrmModule.forFeature([AppUser]),
		forwardRef(() => LoginModule)],
	controllers: [AppUserController],
	providers: [AppUserService, UserConverter, CreateUserConverter, UpdateUserConverter],
	exports: [AppUserService]
})
export class AppUserModule {
}
