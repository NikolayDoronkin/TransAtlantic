import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {Customer} from "../../domain/model/customer/customer";
import {CustomerDto} from "../../domain/response/customer.dto";

@Injectable()
export class CustomerResponseConverter extends AbstractConverter<Promise<Customer>, CustomerDto> {
	// @ts-ignore
	async convert(source: Promise<Customer>): Promise<CustomerDto> {
		const target = new CustomerDto();

		target.id = await source.then(customer => customer.id);
		target.name = await source.then(customer => customer.name);
		target.statusName = await source.then(customer => customer.status.name);
		target.registrationDate = await source.then(customer => customer.registrationDate);

		return target;
	}
}