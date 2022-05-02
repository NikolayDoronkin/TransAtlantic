import { AbstractConverter } from "./abstract.converter";
import { Warehouse } from "../domain/model/warehouse/warehouse";
import { WarehouseDto } from "../domain/dto/warehouse.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WarehouseConverter extends AbstractConverter<Warehouse, WarehouseDto> {
	convert(source: Warehouse): WarehouseDto {
		const target = new WarehouseDto();

		target.name = source.name;
		target.address = source.address.city.cityName;
		target.totalCapacity = source.totalCapacity;

		return target;
	}

}
