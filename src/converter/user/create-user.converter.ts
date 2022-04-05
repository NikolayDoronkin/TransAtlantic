import { CreateUserRequest } from "../../domain/request/create-user.request";
import { User } from "../../domain/user/user";
import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";

@Injectable()
export class CreateUserConverter extends AbstractConverter<CreateUserRequest, User> {
  async convert(source: CreateUserRequest): Promise<User> {
    const target = new User();

    target.login = source.login;
    target.password = source.password;

    return target;
  }
}