import { AppUser } from "../../domain/user/app.user";
import { UpdateUserRequest } from "../../domain/request/update-user.request";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateUserConverter {

  convert(source: UpdateUserRequest): AppUser {
    const target = new AppUser();

    target.id = source.id;
    target.email = source.login;
    target.password = source.password;

    return target;
  }

}