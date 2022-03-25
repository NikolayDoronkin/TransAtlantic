import { forwardRef, Module } from "@nestjs/common";
import { LoginController } from "../controller/login.controller";
import { LoginService } from "../service/login.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "./user.module";

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.SECRET || "SECRET",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService, JwtModule]
})
export class LoginModule {
}
