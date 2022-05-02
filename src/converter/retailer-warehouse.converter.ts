import { AbstractConverter } from "./abstract.converter";
import { RetailerWarehouse } from "../domain/model/retailer/retailer.warehouse";
import { RetailerWarehouseDto } from "../domain/dto/retailer-warehouse.dto";

export class RetailerWarehouseConverter extends AbstractConverter<RetailerWarehouse, RetailerWarehouseDto> {
	convert(source: RetailerWarehouse): RetailerWarehouseDto {
		const target = new RetailerWarehouseDto();

		target.id = source.id;
		target.name = source.name;
		target.address = source.address.city.cityName;
		target.retailer = source.retailer.name;

		return target;
	}

}
