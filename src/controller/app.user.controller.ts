import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AppUser } from "src/domain/user/app.user";
import { CreateUserRequest } from "../domain/request/create-user.request";
import { AppUserService } from "../service/app.user.service";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../configuration/jwt-auth-guard";
import { UpdateUserConverter } from "../converter/user/update-user.converter";
import { CreateUserConverter } from "../converter/user/create-user.converter";
import { UserConverter } from "../converter/user/user.converter";

@Controller("user")
@ApiTags("user-controller")
@ApiBearerAuth("access-token")
export class AppUserController {
	constructor(
		private readonly userService: AppUserService,
		private readonly userConverter: UserConverter,
		private readonly createUserConverter: CreateUserConverter,
		private readonly updateUserConverter: UpdateUserConverter
	) {
	}

	@Get("/getAll")
	//@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 200, type: [AppUser] })
	@ApiOperation({ summary: "Получения всех пользователей." })
	async getAll() {
		return this.userService.getAll();
	}

	@Get("/getById/:id")
	@ApiResponse({ status: 200, type: AppUser })
	@ApiOperation({ summary: "Получения пользователя по идентификатору." })
	getById(@Param("id") id: string): string {
		return this.userService.getById(id);
	}

	@Post("/create")
	//@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 201, type: AppUser })
	@ApiOperation({ summary: "Создания пользователя." })
	async create(@Body() request: CreateUserRequest) {
		return this.userConverter.convert(await this.userService.create(await this.createUserConverter.convert(request)));
	}

	@Put()
	@ApiResponse({ status: 200, type: AppUser })
	@ApiOperation({ summary: "Обновления пользователя." })
	update() {
	}

	@Delete()
	@ApiResponse({ status: 200, type: ApiOkResponse })
	@ApiOperation({ summary: "Удаления пользователя по идентификатору." })
	delete() {
	}
}
