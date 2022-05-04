import { ApplicationStatusDto } from "../../response/application/application-status.dto";

export class CreateApplicationRequest {
	number: number;

	srcWarehouseId: number;

	destWarehouseId: number;

	createTime: Date;

	lastEditorId: number;

	lastEditTime: Date;

	status: ApplicationStatusDto;
}
