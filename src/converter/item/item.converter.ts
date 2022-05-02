import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import { Item } from "../../domain/model/item/item";
import { ItemDto } from "../../domain/dto/item/item.dto";

@Injectable()
export class ItemConverter extends AbstractConverter<Item, ItemDto>{
	convert(source: Item): ItemDto {
		const target = new ItemDto();

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
