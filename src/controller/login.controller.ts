import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginRequest } from "../domain/request/login.request";
import { LoginService } from "../service/login.service";

@ApiTags("login-controller")
@Controller("login")
export class LoginController {

  constructor(
    private loginService: LoginService
  ) {}

  @Post("/sign-in")
  login(@Body() loginRequest: LoginRequest) {
    return this.loginService.login(loginRequest.email, loginRequest.password);
  }

}
