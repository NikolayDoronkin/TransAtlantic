import { AppUser } from "../../domain/model/user/app.user";
import { UserDto } from "../../domain/dto/user.dto";
import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";

@Injectable()
export class UserConverter extends AbstractConverter<AppUser, UserDto> {
	convert(source: AppUser): UserDto {
		const target = new UserDto();

		target.id = source.id;
		target.email = source.email;
		target.firstName = source.firstName;
		target.lastName = source.lastName;
		target.birthday = source.birthday;
		target.roleId = source.roleId;
		target.customerId = source.customerId;
		target.statusId = source.statusId;
		target.addressId = source.addressId;

		return target;
	}
}
