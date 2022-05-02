import { ItemCategoryDto } from "./item-category.dto";
import { CustomerDto } from "../customer.dto";

export class ItemDto {
	id: number;
	name: string;
	upc: number;
	price: number;
	category: ItemCategoryDto;
	unitSize: number;
	customer: CustomerDto;
}
