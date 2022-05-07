import { AbstractConverter } from "../abstract.converter";
import { Application } from "../../domain/model/application/application";
import { ApplicationDto } from "../../domain/response/application/application.dto";
import { Injectable } from "@nestjs/common";
import { UserConverter } from "../user/user.converter";
import { RetailerWarehouseConverter } from "../retailer-warehouse.converter";
import { WarehouseConverter } from "../warehouse/warehouse.converter";

@Injectable()
export class ApplicationConverter extends AbstractConverter<Application, ApplicationDto> {
	constructor(
		private readonly userConverter: UserConverter,
		private readonly warehouseConverter: WarehouseConverter,
		private readonly destWarehouseConverter: RetailerWarehouseConverter,
	) {
		super();
	}

	convert(source: Application): ApplicationDto {
		const target = new ApplicationDto();

		target.id = source.id;
		target.number = source.number;
		target.createTime = source.createTime;
		target.lastEditTime = source.lastEditTime;

		target.lastEditor = this.userConverter.convert(source.lastEditor)
		target.srcWarehouse = this.warehouseConverter.convert(source.srcWarehouse);
		target.destWarehouse = this.destWarehouseConverter.convert(source.destWarehouse);
		target.status = source.status.name;

		return target;
	}

}
