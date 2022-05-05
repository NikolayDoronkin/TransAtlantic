import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {AppUser} from "../../domain/model/user/app.user";
import {CreateUserManagementRequest} from "../../domain/request/user-management/create-user-management.request";
import {CreateAddressRequestConverter} from "../address/create-address.request.converter";

@Injectable()
export class CreateUserManagementRequestConverter extends AbstractConverter<CreateUserManagementRequest, AppUser> {

	constructor(
		private readonly createAddressRequestConverter: CreateAddressRequestConverter,
	) {
		super();
	}

	convert(source: CreateUserManagementRequest): AppUser {
		const target = new AppUser();

		target.email = source.email;
		target.firstName = source.firstName;
		target.lastName = source.lastName;
		target.birthday = source.birthday;
		target.roleId = source.roleId;
		target.address = this.createAddressRequestConverter.convert(source.addressRequest);

		return target;
	}
}
