import { AbstractConverter } from "../abstract.converter";
import { CreateWarehouseRequest } from "../../domain/request/warehouse/create.warehouse.request";
import { Warehouse } from "../../domain/model/warehouse/warehouse";
import { Injectable } from "@nestjs/common";
import { CreateAddressConverter } from "../create.address.converter";

@Injectable()
export class CreateWarehouseConverter extends AbstractConverter<CreateWarehouseRequest, Warehouse> {
	constructor(
		private readonly createAddressConverter: CreateAddressConverter
	) {
		super();
	}

	convert(request: CreateWarehouseRequest): Warehouse {
		const warehouse = new Warehouse();

		warehouse.name = request.name;
		warehouse.address = this.createAddressConverter.convert(request.address);
		warehouse.totalCapacity = request.totalCapacity;
		warehouse.customerId = request.customerId;

		return warehouse;
	}
}
