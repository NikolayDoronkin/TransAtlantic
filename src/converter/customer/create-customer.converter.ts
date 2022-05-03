import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {CreateCustomerRequest} from "../../domain/request/create-customer.request";
import {AppUser} from "../../domain/model/user/app.user";

@Injectable()
export class CreateCustomerUserConverter extends AbstractConverter<CreateCustomerRequest, AppUser> {
	convert(source: CreateCustomerRequest): AppUser {
		const target = new AppUser();

		target.firstName = source.firstName;
		target.lastName = source.lastName;
		target.email = source.email;

		return target;
	}
}
