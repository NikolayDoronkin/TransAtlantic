import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { User } from '../domain/user';
import { LoginModule } from "./login.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => LoginModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
