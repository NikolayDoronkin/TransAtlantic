import { User } from "../../domain/user/user";
import { UserDto } from "../../domain/dto/user.dto";
import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";

@Injectable()
export class UserConverter extends AbstractConverter<User, UserDto>{
  async convert(source: User): Promise<UserDto> {
    const target = new UserDto();

    target.id = source.id;
    target.login = source.login;

    return target;
  }
}