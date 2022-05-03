import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AppUser } from "src/domain/model/user/app.user";
import { CreateUserRequest } from "../domain/request/create-user.request";
import { AppUserService } from "../service/app.user.service";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../configuration/jwt-auth-guard";
import { UpdateUserConverter } from "../converter/user/update-user.converter";
import { CreateUserConverter } from "../converter/user/create-user.converter";
import { UserConverter } from "../converter/user/user.converter";
import { UserDto } from "../domain/response/user.dto";
import { UpdateUserRequest } from "../domain/request/update-user.request";

@Controller("user")
@ApiTags("app-user-controller")
//@ApiBearerAuth("access-token")
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
	getById(@Param("id") id: number): Promise<UserDto> {
		return this.userConverter.convert(this.userService.getById(id));
	}

	@Post("/create")
	//@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 201, type: AppUser })
	@ApiOperation({ summary: "Создания пользователя." })
	async create(@Body() request: CreateUserRequest): Promise<UserDto> {
		return this.userConverter.convert(this.userService.create(await this.createUserConverter.convert(request)));
	}

	@Put()
	@ApiResponse({ status: 200, type: AppUser })
	@ApiOperation({ summary: "Обновления пользователя." })
	async update(@Body() request: UpdateUserRequest): Promise<UserDto> {
		return this.userConverter.convert(this.userService.update(await this.updateUserConverter.convert(request)));
	}

	@Delete()
	@ApiResponse({ status: 200, type: ApiOkResponse })
	@ApiOperation({ summary: "Удаления пользователя по идентификатору." })
	delete() {
	}
}
