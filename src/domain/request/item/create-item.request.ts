import { ApiProperty } from "@nestjs/swagger";

export class CreateItemRequest {
	@ApiProperty({ description: "UPC продукта.", example: "number" })
	readonly upc: number;

	@ApiProperty({ description: "Название продукта.", example: "string" })
	readonly label: string

	@ApiProperty({ description: "Идентификатор категории продукта.", example: "number" })
	readonly categoryId: number;

	@ApiProperty({ description: "Идентификатор клиента.", example: "number" })
	readonly customerId: number;

	@ApiProperty({ description: "Единицы пространства продукта.", example: "number" })
	readonly units: number;

	@ApiProperty({ description: "Цена продукта.", example: "number" })
	readonly price: number;
}
