import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { WarehouseService } from "../service/warehouse.service";
import { WarehouseConverter } from "../converter/warehouse/warehouse.converter";
import { CreateWarehouseRequest } from "../domain/request/warehouse/create.warehouse.request";
import { WarehouseResponse } from "../domain/response/warehouse.response";
import { CreateWarehouseConverter } from "../converter/warehouse/create.warehouse.converter";
import { JwtAuthGuard } from "../configuration/jwt/jwt-auth-guard";

@Controller()
@ApiBearerAuth("access-token")
@ApiTags("warehouse-controller")
export class WarehouseController {
	constructor(
		private readonly warehouseService: WarehouseService,
		private readonly warehouseConverter: WarehouseConverter,
		private readonly createWarehouseConverter: CreateWarehouseConverter
	) {
	}

	@UseGuards(JwtAuthGuard)
	@Get("/customer/:id/warehouses")
	@ApiResponse({ status: 200, type: [WarehouseResponse] })
	@ApiOperation({ summary: "Получение всех складов клиента" })
	getByCustomerId(@Param("id") id: number): Promise<WarehouseResponse[]> {
		return this.warehouseService.getByCustomerId(id);
	}

	@UseGuards(JwtAuthGuard)
	@Get("/customer/:customerId/warehouses/:warehouseId")
	@ApiResponse({ status: 200, type: [WarehouseResponse] })
	@ApiOperation({ summary: "Получение склада клиента" })
	async getByCustomerIdAndWarehouseId(@Param("customerId") customerId: number,
										@Param("warehouseId") warehouseId: number): Promise<WarehouseResponse> {
		return this.warehouseConverter.convert(
			await this.warehouseService.getByCustomerIdAndWarehouseId(customerId, warehouseId));
	}

	@UseGuards(JwtAuthGuard)
	@Post("/customer/:id/warehouses/create")
	@ApiResponse({ status: 200, type: [WarehouseResponse] })
	@ApiOperation({ summary: "Создание склада" })
	async create(@Param("id") id: number, @Body() warehouseReq: CreateWarehouseRequest) {
		let warehouse = this.createWarehouseConverter.convert(warehouseReq);
		warehouse = await this.warehouseService.create(warehouse);
		return this.warehouseConverter.convert(warehouse);
	}

	@UseGuards(JwtAuthGuard)
	@Delete("/customer/:id/warehouses/delete")
	@ApiResponse({ status: 200, type: ApiOkResponse })
	@ApiTags("For Katya: NW")
	@ApiOperation({ summary: "Удаление пустых складов клиента" })
	deleteEmpty(@Param("id") id: number, @Query() query) {
		let warehouseIds = query["warehouseId"];
		this.warehouseService.deleteEmptyByCustomerIdAndWarehouseIdIn(id, warehouseIds);
	}
}
