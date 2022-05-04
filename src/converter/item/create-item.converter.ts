import { AbstractConverter } from "../abstract.converter";
import { CreateItemRequest } from "../../domain/request/item/create-item.request";
import { Item } from "../../domain/model/item/item";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateItemConverter extends AbstractConverter<CreateItemRequest, Item> {
	convert(source: CreateItemRequest): Item {
		const target = new Item();

		target.upc = source.upc;
		target.name = source.label;
		target.categoryId = source.categoryId;
		target.customerId = source.customerId;
		target.unitSize = source.units;
		target.price = source.price;

		return target
	}

}
