import { CreateUserRequest } from "../../domain/request/create-user.request";
import { AppUser } from "../../domain/user/app.user";
import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";

@Injectable()
export class CreateUserConverter extends AbstractConverter<CreateUserRequest, AppUser> {
  async convert(source: CreateUserRequest): Promise<AppUser> {
    const target = new AppUser();

    target.login = source.login;
    target.password = source.password;

    return target;
  }
}
