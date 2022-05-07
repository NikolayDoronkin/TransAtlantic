import { AddressResponse } from "./address.response";

export class WarehouseResponse {
	id: number;
	name: string;
	address: AddressResponse;
	availableCapacity: number;
	totalCapacity: number;
}
