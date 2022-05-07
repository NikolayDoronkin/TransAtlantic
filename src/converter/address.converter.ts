import { AbstractConverter } from "./abstract.converter";
import { Address } from "../domain/model/address/address";
import { AddressResponse } from "../domain/response/address.response";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressConverter extends AbstractConverter<Address, AddressResponse> {
	convert(address: Address): AddressResponse {
		const addressResponse = new AddressResponse();

		addressResponse.state = address.city.state.stateName;
		addressResponse.city = address.city.cityName;
		addressResponse.addressLine1 = address.addressLine1;
		addressResponse.addressLine2 = address.addressLine2;

		return addressResponse;
	}
}
