import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {Customer} from "../../domain/model/customer/customer";
import {CustomerResponse} from "../../domain/response/customer.response";

@Injectable()
export class CustomerResponseConverter extends AbstractConverter<Customer, CustomerResponse> {
	convert(source: Customer): CustomerResponse {
		const target = new CustomerResponse();

		target.id = source.id;
		target.name = source.name;
		target.statusName = source.status.name;
		target.registrationDate = source.registrationDate;

		return target;
	}
}
