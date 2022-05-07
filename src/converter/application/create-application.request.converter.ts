import { AbstractConverter } from "../abstract.converter";
import { CreateApplicationRequest } from "../../domain/request/application/create-application.request";
import { Application } from "../../domain/model/application/application";
import { SecurityUtils } from "../../configuration/security.utils";

export class CreateApplicationRequestConverter extends AbstractConverter<CreateApplicationRequest, Application> {
	convert(source: CreateApplicationRequest): Application {
		const target = new Application();

		target.number = source.number;
		target.srcWarehouseId = source.srcWarehouseId;
		target.destWarehouseId = source.destWarehouseId;
		target.createTime = new Date();
		target.lastEditor = SecurityUtils.getCurrentUser();
		target.lastEditTime = new Date();
		target.statusId = source.statusId;

		return target;
	}
}
