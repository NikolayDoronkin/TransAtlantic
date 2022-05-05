import { ApiProperty } from "@nestjs/swagger";
import { Min } from "class-validator";

export class UpdateItemCategoryRequest {
	@ApiProperty({ description: "Идентификатор категории продукта.", example: "number" })
	id: number;

	@ApiProperty({ description: "Сумма налога на данную категорию.", example: "number" })
	@Min(0)
	taxRate: number;
}
