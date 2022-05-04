import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ItemService } from "../service/item/item.service";
import { ItemResponse } from "../domain/response/item/item.response";
import { ItemConverter } from "../converter/item/item.converter";
import { CreateItemRequest } from "../domain/request/item/create-item.request";
import { CreateItemConverter } from "../converter/item/create-item.converter";

@Controller("item")
@ApiTags("item-controller")
export class ItemController {
	constructor(
		private readonly itemService: ItemService,
		private readonly itemConverter: ItemConverter,
		private readonly createItemConverter: CreateItemConverter
	) {
	}

	@Get("/getByCustomerId/:id")
	@ApiResponse({ status: 200, type: [ItemResponse] })
	@ApiOperation({ summary: "Получение продукта." })
	async getCustomerById(@Param("id") id: number): Promise<ItemResponse[]> {
		return this.itemConverter.convertArray(await this.itemService.getByCustomerId(id));
	}

	@Get("/count/:id")
	@ApiResponse({ status: 200, type: [ItemResponse] })
	@ApiOperation({ summary: "Получение продукта." })
	async getCountByCustomerId(@Param("id") id: number): Promise<number> {
		return await this.itemService.getCountByCustomerId(id);
	}

	@Post("/create")
	@ApiResponse({ status: 2011, type: [ItemResponse] })
	@ApiOperation({ summary: "Создание продукта." })
	async create(@Body() request: CreateItemRequest): Promise<ItemResponse> {
		return this.itemConverter.convert(await this.itemService.create(this.createItemConverter.convert(request)));
	}

	@Delete("/delete")
	@ApiResponse({ status: 200, type: [ApiOkResponse] })
	@ApiOperation({ summary: "Удаление продукта." })
	async delete(@Body() request: number[]): Promise<void> {
		return await this.itemService.deleteByIds(request);
	}
}
