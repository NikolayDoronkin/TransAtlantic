import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import { Item } from "../../domain/model/item/item";
import { ItemResponse } from "../../domain/response/item/item.response";

@Injectable()
export class ItemConverter extends AbstractConverter<Item, ItemResponse>{
	convert(source: Item): ItemResponse {
		const target = new ItemResponse();

		target.id = source.id;
		target.name = source.name;
		target.upc = source.upc;
		target.price = source.price;
		target.category  = source.category;
		target.unitSize = source.unitSize;
		target.customer = source.customer;

		return target;
	}
}
