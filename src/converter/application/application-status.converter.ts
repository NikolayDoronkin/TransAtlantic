import { AbstractConverter } from "../abstract.converter";
import { ApplicationStatus } from "../../domain/model/application/application.status";
import { ApplicationStatusDto } from "../../domain/dto/application-status.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplicationStatusConverter extends AbstractConverter<ApplicationStatus, ApplicationStatusDto> {
	convert(source: ApplicationStatus): ApplicationStatusDto {
		return undefined;
	}

}
