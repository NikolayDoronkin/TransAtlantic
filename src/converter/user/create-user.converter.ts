import { CreateUserRequest } from "../../domain/request/create-user.request";
import { User } from "../../domain/user/user";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserConverter {

  convert(source: CreateUserRequest): User {
    const target = new User();

    target.login = source.login;
    target.password = source.password;

    return target;
  }

}