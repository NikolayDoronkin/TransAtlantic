import { User } from "../../domain/user/user";
import { UpdateUserRequest } from "../../domain/request/update-user.request";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateUserConverter {

  convert(source: UpdateUserRequest): User {
    const target = new User();

    target.id = source.id;
    target.login = source.login;
    target.password = source.password;

    return target;
  }

}