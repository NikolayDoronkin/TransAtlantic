import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAddressRequest {
	@IsNotEmpty({ message: "Поле не должно быть пустым." })
	@ApiProperty({ description: "Айди страны.", example: "1" })
	readonly stateId: number;

	@IsNotEmpty({ message: "Поле не должно быть пустым." })
	@ApiProperty({ description: "Айди города.", example: "1" })
	readonly cityId: number;

	@IsNotEmpty({ message: "Поле не должно быть пустым." })
	@ApiProperty({ description: "Строка адреса 1.", example: "string" })
	readonly addressLine1: string;

	@ApiProperty({ description: "Строка адреса 2.", example: "string" })
	readonly addressLine2: string;
}
