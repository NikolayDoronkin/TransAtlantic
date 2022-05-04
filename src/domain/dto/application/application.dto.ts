import { WarehouseDto } from "../warehouse.dto";
import { RetailerWarehouseDto } from "../retailer-warehouse.dto";
import { ApplicationStatusDto } from "./application-status.dto";
import {UserDto} from "../../response/user.dto";

export class ApplicationDto {
	id: number;

	number: number;

	srcWarehouse: WarehouseDto;

	destWarehouse: RetailerWarehouseDto;

	createTime: string;

	lastEditor: UserDto;

	lastEditTime: string;

	status: ApplicationStatusDto;
}
