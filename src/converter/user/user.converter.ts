import { AppUser } from "../../domain/user/app.user";
import { UserDto } from "../../domain/dto/user.dto";
import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";

@Injectable()
export class UserConverter extends AbstractConverter<AppUser, UserDto>{
  async convert(source: AppUser): Promise<UserDto> {
    const target = new UserDto();

    target.id = source.id;
    target.email = source.email;

    return target;
  }
}
