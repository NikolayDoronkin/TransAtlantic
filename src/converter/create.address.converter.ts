import { AbstractConverter } from "./abstract.converter";
import { CreateAddressRequest } from "../domain/request/create.address.request";
import { Address } from "../domain/model/address/address";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateAddressConverter extends AbstractConverter<CreateAddressRequest, Address> {
	convert(request: CreateAddressRequest): Address {
		const address = new Address();

		address.cityId = request.cityId;
		address.addressLine1 = request.addressLine1;
		address.addressLine2 = request.addressLine2;

		return address;
	}
}
