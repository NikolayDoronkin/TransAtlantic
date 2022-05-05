import { AbstractConverter } from "../abstract.converter";
import { ItemCategory } from "../../domain/model/item/item.category";
import { ItemCategoryResponse } from "../../domain/response/item/item-category.response";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ItemCategoryConverter extends AbstractConverter<ItemCategory, ItemCategoryResponse>{
	convert(source: ItemCategory): ItemCategoryResponse {
		const target = new ItemCategoryResponse();

		target.id = source.id;
		target.name = source.name;
		target.taxRate = source.taxRate;
		target.customerAmount = source.amount;

		return target;
	}
}
