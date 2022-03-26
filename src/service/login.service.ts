import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { AppStatusCode } from "../domain/enum/app-status-code";
import * as BCrypt from "bcrypt";
import { User } from "../domain/user/user";

@Injectable()
export class LoginService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(login: string, password: string) {
    const user = await this.validateUser(login, password);

    return this.generateToken(user);
  }

  private async validateUser(login: string, password: string) {
    const user = await this.userService.getByLogin(login);
    const isEqual = await BCrypt.compare(password, user.password);

    if (isEqual) {
      return user;
    }

    throw new UnauthorizedException(AppStatusCode.USER_DOES_NOT_EXIST);
  }

  private async generateToken(user: User) {
    const payload = {id: user.id, login: user.login, password: user.password};

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
