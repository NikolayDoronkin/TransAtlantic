import { CreateAddressRequest } from "../create.address.request";

export class CreateWarehouseRequest {
	name: string;
	address: CreateAddressRequest;
	totalCapacity: number;
	customerId: number;
}
