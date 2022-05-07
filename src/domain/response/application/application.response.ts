import { WarehouseResponse } from "../warehouse.response";
import { RetailerWarehouseResponse } from "../retailer-warehouse.response";
import { ApplicationStatusDto } from "./application-status.dto";
import {UserResponse} from "../user.response";

export class ApplicationResponse {
	id: number;

	number: number;

	srcWarehouse: WarehouseResponse;

	destWarehouse: RetailerWarehouseResponse;

	createTime: Date;

	lastEditor: UserResponse;

	lastEditTime: Date;

	status: ApplicationStatusDto;
}
