import { CreateUserRequest } from "../../domain/request/create-user.request";
import { AppUser } from "../../domain/model/user/app.user";
import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";

@Injectable()
export class CreateUserConverter extends AbstractConverter<CreateUserRequest, AppUser> {
	convert(source: CreateUserRequest): AppUser {
		const target = new AppUser();

		target.email = source.email;
		target.password = source.password;
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
