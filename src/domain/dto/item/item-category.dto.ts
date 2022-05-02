import { CustomerDto } from "../customer.dto";

export class ItemCategoryDto {
	id: number;

	name: string;

	taxRate: number;

	customer: CustomerDto;
}
