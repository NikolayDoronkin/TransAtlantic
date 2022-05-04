import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApplicationService } from "../service/application.service";
import { ApplicationConverter } from "../converter/application/application.converter";
import { ApplicationDto } from "../domain/dto/application/application.dto";
import { AppUser } from "../domain/model/user/app.user";
import { CreateUserRequest } from "../domain/request/user/create-user.request";
import { UserDto } from "../domain/dto/user.dto";
import { CreateApplicationRequest } from "../domain/request/application/create-application.request";

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