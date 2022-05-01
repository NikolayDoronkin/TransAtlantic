import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AppUserService } from "./app.user.service";
import { JwtService } from "@nestjs/jwt";
import { AppStatusCode } from "../domain/enum/app-status-code";
import * as BCrypt from "bcrypt";
import { AppUser } from "../domain/user/app.user";

@Injectable()
export class LoginService {

  constructor(
    private appUserService: AppUserService,
    private jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    return this.generateToken(user);
  }

  private async validateUser(email: string, password: string) {
    const user = await this.appUserService.getByEmail(email);
    const isEqual = await BCrypt.compare(password, user.password);

    if (isEqual) {
      return user;
    }

    throw new UnauthorizedException(AppStatusCode.USER_DOES_NOT_EXIST);
  }

  private async generateToken(user: AppUser) {
    const payload = {id: user.id, login: user.email, password: user.password};

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
