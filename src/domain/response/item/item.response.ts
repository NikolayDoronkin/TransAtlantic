import { ItemCategoryResponse } from "./item-category.response";
import {CustomerResponse} from "../customer.response";
import {ItemCategory} from "../../model/item/item.category";
import {Customer} from "../../model/customer/customer";

export class ItemResponse {
	id: number;
	name: string;
	upc: number;
	price: number;
	category: ItemCategory;
	unitSize: number;
	customer: Customer;
}
