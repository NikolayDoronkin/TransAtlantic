import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApplicationService } from "../service/application.service";
import { ApplicationConverter } from "../converter/application/application.converter";
import { JwtAuthGuard } from "../configuration/jwt/jwt-auth-guard";
import { CreateApplicationRequest } from "../domain/request/application/create-application.request";
import { ApplicationResponse } from "../domain/response/application/application.response";
import { CreateApplicationRequestConverter } from "../converter/application/create-application.request.converter";

@Controller("application")
@ApiTags("application-controller")
export class ApplicationController {
	constructor(
		private readonly applicationService: ApplicationService,
		private readonly applicationConverter: ApplicationConverter,
		private readonly createApplicationRequestConverter: CreateApplicationRequestConverter
	) {
	}


	@Get("/getByCustomerId/:id")
	@ApiResponse({ status: 200, type: [ApplicationResponse] })
	@ApiOperation({ summary: "Получения заявок по идентификатору клиента." })
	async getCustomerById(@Param("id") id: number): Promise<ApplicationResponse[]> {
		return this.applicationConverter.convertArray(await this.applicationService.getByCustomerId(id));
	}

	@Post("/create")
	@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 201, type: ApplicationResponse })
	@ApiOperation({ summary: "Создание заявки." })
	async create(@Body() request: CreateApplicationRequest): Promise<ApplicationResponse> {
		return this.applicationConverter.convert(
			await this.applicationService.create(this.createApplicationRequestConverter.convert(request))
		);
	}
}
