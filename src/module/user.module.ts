import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { User } from "../domain/user/user";
import { LoginModule } from "./login.module";
import { UserConverter } from "../converter/user/user.converter";
import { CreateUserConverter } from "../converter/user/create-user.converter";
import { UpdateUserConverter } from "../converter/user/update-user.converter";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => LoginModule)],
  controllers: [UserController],
  providers: [UserService, UserConverter, CreateUserConverter, UpdateUserConverter],
  exports: [UserService]
})
export class UserModule {
}
