import {CustomerResponse} from "../customer.response";

export class ItemCategoryResponse {
	id: number;

	name: string;

	taxRate: number;

	customer: CustomerResponse;

	customerAmount: number;
}
