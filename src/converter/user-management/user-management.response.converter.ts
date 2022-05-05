import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {AppUser} from "../../domain/model/user/app.user";
import {UserManagementResponse} from "../../domain/response/user-management.response";

@Injectable()
export class UserManagementResponseConverter extends AbstractConverter<AppUser, UserManagementResponse> {
	convert(source: AppUser): UserManagementResponse {
		const target = new UserManagementResponse();

		target.id = source.id;
		target.fullName = source.firstName+" "+source.lastName;
		target.statusName = source.status.statusName;
		target.birthday = source.birthday;
		target.email = source.email;
		target.roleName = source.role.roleName;

		return target;
	}
}
