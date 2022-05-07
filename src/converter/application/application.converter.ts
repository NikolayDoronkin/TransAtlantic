import { AbstractConverter } from "../abstract.converter";
import { Application } from "../../domain/model/application/application";
import { ApplicationResponse } from "../../domain/response/application/application.response";
import { Injectable } from "@nestjs/common";
import { UserConverter } from "../user/user.converter";
import { WarehouseConverter } from "../warehouse.converter";
import { RetailerWarehouseConverter } from "../retailer-warehouse.converter";

@Injectable()
export class ApplicationConverter extends AbstractConverter<Application, ApplicationResponse> {
	constructor(
		private readonly userConverter: UserConverter,
		private readonly warehouseConverter: WarehouseConverter,
		private readonly destWarehouseConverter: RetailerWarehouseConverter,
	) {
		super();
	}

	convert(source: Application): ApplicationResponse {
		const target = new ApplicationResponse();

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

