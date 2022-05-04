import {Body, Controller, Get, Post} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CustomerService} from "../service/customer.service";
import {CreateCustomerRequest} from "../domain/request/create-customer.request";
import {CreateCustomerResponse} from "../domain/response/create-customer.response";
import {CreateCustomerUserConverter} from "../converter/customer/create-customer.converter";
import {CreateCustomerConverter} from "../converter/customer/create-customer-user.converter";
import {CreateCustomerResponseConverter} from "../converter/customer/create-customer.response.converter";
import {CustomerDto} from "../domain/response/customer.dto";
import {CustomerResponseConverter} from "../converter/customer/customer.response.converter";

@Controller("customer")
@ApiTags("customer-controller")
export class CustomerController {
	constructor(
		private readonly customerService: CustomerService,

		private readonly createUserConverter: CreateCustomerUserConverter,
		private readonly createCustomerConverter: CreateCustomerConverter,
		private readonly customerResponseConverter: CustomerResponseConverter,
		private readonly createCustomerResponseConverter: CreateCustomerResponseConverter
	) {
	}

	@Get('/getAll')
	@ApiResponse({status: 200, type: [CustomerDto]})
	@ApiOperation({summary: 'Получение всех клиентов.'})
	async getAll(): Promise<CustomerDto[]> {
		return this.customerService.getAll().then(customers => {
			return this.customerResponseConverter.convertArray(customers);
		});
	}

	@Post('/disable')
	@ApiResponse({status: 200, type: [ApiOkResponse]} )
	@ApiOperation({summary: 'Блокировка клиентов.'})
	async disableCustomers(@Body() customerIds: number[]) {
		return this.customerService.disableCustomers(customerIds);
	}

	@Post('/enable')
	@ApiResponse({status: 200, type: [ApiOkResponse]})
	@ApiOperation({summary: 'Разблокировка клиентов.'})
	async enableCustomers(@Body() customerIds: number[]) {
		return this.customerService.enableCustomers(customerIds);
	}

	@Post("/create")
	@ApiResponse({ status: 201, type: CreateCustomerResponse })
	@ApiOperation({ summary: "Создание клиента и пользователя." })
	async create(@Body() request: CreateCustomerRequest): Promise<CreateCustomerResponse> {
		return this.createCustomerResponseConverter.convert(this.customerService.create(
			await this.createCustomerConverter.convert(request),
			await this.createUserConverter.convert(request)));
	}
}
