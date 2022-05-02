import { AppUser } from "../../domain/model/user/app.user";
import { UserDto } from "../../domain/dto/user.dto";
import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";

@Injectable()
export class UserConverter extends AbstractConverter<Promise<AppUser>, UserDto> {
	// @ts-ignore
	async convert(source: Promise<AppUser>): Promise<UserDto> {
		const target = new UserDto();

		target.id = await source.then(appUser => appUser.id);
		target.email = await source.then(appUser => appUser.email);
		target.firstName = await source.then(appUser => appUser.firstName);
		target.lastName = await source.then(appUser => appUser.lastName);
		target.birthday = await source.then(appUser => appUser.birthday);
		target.roleId = await source.then(appUser => appUser.roleId);
		target.customerId = await source.then(appUser => appUser.customerId);
		target.statusId = await source.then(appUser => appUser.statusId);
		target.addressId = await source.then(appUser => appUser.addressId);

		return target;
	}
}
