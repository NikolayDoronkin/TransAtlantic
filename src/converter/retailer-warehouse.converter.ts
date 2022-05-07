import { AbstractConverter } from "./abstract.converter";
import { RetailerWarehouse } from "../domain/model/retailer/retailer.warehouse";
import { RetailerWarehouseResponse } from "../domain/response/retailer-warehouse.response";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RetailerWarehouseConverter extends AbstractConverter<RetailerWarehouse, RetailerWarehouseResponse> {
	convert(source: RetailerWarehouse): RetailerWarehouseResponse {
		const target = new RetailerWarehouseResponse();

		target.id = source.id;
		target.name = source.name;
		target.address = source.address.city.cityName;
		target.retailer = source.retailer.name;

		return target;
	}
}
