import { AppUser } from "../../domain/model/user/app.user";
import { UpdateUserRequest } from "../../domain/request/update-user.request";
import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";

@Injectable()
export class UpdateUserConverter extends AbstractConverter<UpdateUserRequest, AppUser> {
	convert(source: UpdateUserRequest): AppUser {
		const target = new AppUser();

		target.id = source.id;
		target.firstName = source.firstName;
		target.lastName = source.lastName;
		target.birthday = source.birthday;

		return target;
	}
}
