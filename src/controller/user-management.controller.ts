import {Body, Controller, Get, Post} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CustomerService} from "../service/customer.service";
import {CreateCustomerRequest} from "../domain/request/create-customer.request";
import {CreateCustomerResponse} from "../domain/response/create-customer.response";
import {CreateCustomerUserConverter} from "../converter/customer/create-customer.converter";
import {CreateCustomerConverter} from "../converter/customer/create-customer-user.converter";
import {CreateCustomerResponseConverter} from "../converter/customer/create-customer.response.converter";
import {CustomerResponse} from "../domain/response/customer.response";
import {CustomerResponseConverter} from "../converter/customer/customer.response.converter";
import {AppUserService} from "../service/app.user.service";
import {UserManagementResponseConverter} from "../converter/user-management/user-management.response.converter";
import {UserManagementResponse} from "../domain/response/user-management.response";

@Controller("user-management")
@ApiTags("user-management-controller")
export class UserManagementController {
	constructor(
		private readonly userService: AppUserService,

		private readonly userManagementResponseConverter: UserManagementResponseConverter
	) {
	}

	@Get('/getAll')
	@ApiResponse({status: 200, type: [UserManagementResponse]})
	@ApiOperation({summary: 'Получение всех пользователей.'})
	async getAll(): Promise<UserManagementResponse[]> {
		return this.userService.getAll().then(customers => {
			return this.userManagementResponseConverter.convertArray(customers);
		});
	}

	@Post('/disable')
	@ApiResponse({status: 200, type: [ApiOkResponse]} )
	@ApiOperation({summary: 'Блокировка пользователей.'})
	async disableCustomers(@Body() userIds: number[]) {
		return this.userService.disableUsers(userIds);
	}

	@Post('/enable')
	@ApiResponse({status: 200, type: [ApiOkResponse]})
	@ApiOperation({summary: 'Разблокировка пользователей.'})
	async enableCustomers(@Body() userIds: number[]) {
		return this.userService.enableUsers(userIds);
	}
}
