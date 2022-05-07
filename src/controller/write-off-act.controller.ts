import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CustomerService} from "../service/customer.service";
import {CustomerResponse} from "../domain/response/customer.response";
import {WriteOffService} from "../service/write-off.service";
import {WriteOffActResponseConverter} from "../converter/write-off/write-off-act.response.converter";
import {WriteOffResponse} from "../domain/response/write-off.response";
import {CreateCustomerResponse} from "../domain/response/create-customer.response";
import {CreateCustomerRequest} from "../domain/request/create-customer.request";
import {WriteOffActCreateRequest} from "../domain/request/write-off/write-off-act-create.request";
import {WriteOffActCreateRequestConverter} from "../converter/write-off/write-off-act-create.request.converter";
import {JwtAuthGuard} from "../configuration/jwt/jwt-auth-guard";

@ApiBearerAuth("access-token")
@Controller("write-off-act")
@ApiTags("write-off-act-controller")
export class WriteOffActController {
	constructor(
		private readonly writeOffService: WriteOffService,
		private readonly actResponseConverter: WriteOffActResponseConverter,
		private readonly actCreateRequestConverter: WriteOffActCreateRequestConverter,
	) {
	}

	@Get('/getAll')
	@UseGuards(JwtAuthGuard)
	@ApiResponse({status: 200, type: [CustomerResponse]})
	@ApiOperation({summary: 'Получение всех клиентов.'})
	async getAll(): Promise<WriteOffResponse[]> {
		return this.writeOffService.getAll().then(customers => {
			return this.actResponseConverter.convertArray(customers);
		});
	}

	@Post("/create")
	@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 201, type: Number})
	@ApiOperation({ summary: "Создание списания." })
	async create(@Body() request: WriteOffActCreateRequest): Promise<number> {
		return await this.writeOffService.create(
			await this.actCreateRequestConverter.convert(request));
	}

	@Post("/total-price")
	@ApiResponse({ status: 201, type: Number})
	@ApiOperation({ summary: "Подсчет общей стоимости." })
	async countTotalPrice(@Body() request: WriteOffActCreateRequest): Promise<number> {
		return await this.writeOffService.countTotalPrice(
			await this.actCreateRequestConverter.convert(request));
	}
}
