import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApplicationDto } from "../domain/dto/application/application.dto";
import { ApplicationService } from "../service/application.service";
import { ApplicationConverter } from "../converter/application/application.converter";
import { ItemService } from "../service/item.service";
import { ItemDto } from "../domain/dto/item/item.dto";
import { ItemConverter } from "../converter/item/item.converter";

@Controller("item")
@ApiTags("item-controller")
export class ItemController {
	constructor(
		private readonly itemService: ItemService,

		private readonly itemConverter: ItemConverter
	) {
	}

	@Get("/getByCustomerId/:id")
	@ApiResponse({ status: 200, type: [ItemDto] })
	@ApiOperation({ summary: "Получение продукта." })
	async getCustomerById(@Param("id") id: number): Promise<ItemDto[]> {
		return this.itemConverter.convertArray(await this.itemService.getByCustomerId(id));
	}
}
