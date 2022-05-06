import { forwardRef, Module } from "@nestjs/common";
import { LoginController } from "../controller/login.controller";
import { LoginService } from "../service/login.service";
import { JwtModule } from "@nestjs/jwt";
import { AppUserModule } from "./app.user.module";
import { JwtStrategy } from "../configuration/jwt/jwt.strategy";

@Module({
  imports: [
    forwardRef(() => AppUserModule),
    JwtModule.register({
      secret: "SECRET",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
  exports: [LoginService]
})
export class LoginModule {
}
