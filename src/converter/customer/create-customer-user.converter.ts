import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {CreateCustomerRequest} from "../../domain/request/create-customer.request";
import {Customer} from "../../domain/model/customer/customer";

@Injectable()
export class CreateCustomerConverter extends AbstractConverter<CreateCustomerRequest, Customer> {
	convert(source: CreateCustomerRequest): Customer {
		const target = new Customer();

		target.name = source.name;
		target.registrationDate = new Date();

		return target;
	}
}