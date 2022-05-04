import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {Customer} from "../../domain/model/customer/customer";
import {CustomerDto} from "../../domain/response/customer.dto";

@Injectable()
export class CustomerResponseConverter extends AbstractConverter<Customer, CustomerDto> {
	convert(source: Customer): CustomerDto {
		const target = new CustomerDto();

		/*source.then(source => {
			target.id = source.id;
			target.name = source.name;
			target.statusName = source.status.name;
			target.registrationDate = source.registrationDate;
		})*/

		target.id = source.id;
		target.name = source.name;
		target.statusName = source.status.name;
		target.registrationDate = source.registrationDate;

		return target;
	}
}
