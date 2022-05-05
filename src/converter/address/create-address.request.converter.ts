import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {CreateAddressRequest} from "../../domain/request/user-management/create-address.request";
import {Address} from "../../domain/model/address/address";

@Injectable()
export class CreateAddressRequestConverter extends AbstractConverter<CreateAddressRequest, Address> {
	convert(source: CreateAddressRequest): Address {
		const target = new Address();
		target.cityId = source.cityId;
		target.addressLine1 = source.addressLine1;
		target.addressLine2 = source.addressLine2;
		return target;
	}
}
