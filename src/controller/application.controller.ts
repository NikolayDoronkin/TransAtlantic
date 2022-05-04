import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApplicationService } from "../service/application.service";
import { ApplicationConverter } from "../converter/application/application.converter";
import { ApplicationDto } from "../domain/response/application/application.dto";

@Controller("application")
@ApiTags("application-controller")
export class ApplicationController {
	constructor(
		private readonly applicationService: ApplicationService,

		private readonly applicationConverter: ApplicationConverter
	) {
	}

	@Get("/getByCustomerId/:id")
	@ApiResponse({ status: 200, type: [ApplicationDto] })
	@ApiOperation({ summary: "Получения заявок по идентификатору клиента." })
	async getCustomerById(@Param("id") id: number): Promise<ApplicationDto[]> {
		return this.applicationConverter.convertArray(await this.applicationService.getByCustomerId(id));
	}

/*	@Post("/create")
	//@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 201, type: AppUser })
	@ApiOperation({ summary: "Создание заявки." })
	async create(@Body() request: CreateApplicationRequest): Promise<ApplicationDto> {

	}*/
}
