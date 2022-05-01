import {Controller, Get} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Customer} from "../domain/model/customer/customer";
import {CustomerService} from "../service/customer.service";

@Controller('customer')
@ApiTags('customer-controller')
export class CustomerController {
	constructor(
		private readonly customerService: CustomerService
	) {
	}

	@Get('/findAll')
	@ApiResponse({status: 200, type: [Customer]})
	@ApiOperation({summary: 'Получение всех клиентов.'})
	async getAll(): Promise<Customer[]> {
		return this.customerService.findAll();
	}
}
