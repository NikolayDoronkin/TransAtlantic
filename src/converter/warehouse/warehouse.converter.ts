import { AbstractConverter } from "../abstract.converter";
import { Warehouse } from "../../domain/model/warehouse/warehouse";
import { Injectable } from "@nestjs/common";
import { WarehouseResponse } from "../../domain/response/warehouse.response";

@Injectable()
export class WarehouseConverter extends AbstractConverter<Warehouse, WarehouseResponse> {
	convert(source: Warehouse): WarehouseResponse {
		const target = new WarehouseResponse();

		target.id = source.id;
		target.name = source.name;
		target.address = null;
		target.totalCapacity = source.totalCapacity;

		return target;
	}
}
