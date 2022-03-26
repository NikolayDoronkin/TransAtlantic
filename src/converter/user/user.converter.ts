import { User } from "../../domain/user/user";
import { UserDto } from "../../domain/dto/user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserConverter {

  async convert(source: User): Promise<UserDto> {
    const target = new UserDto();

    target.id = source.id;
    target.login = source.login;

    return target;
  }
}