import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserRequest {
	@IsNotEmpty({ message: "Поле не должно быть пустым." })
	@ApiProperty({ description: "Логин пользователя.", example: "testLogin" })
	readonly email: string;

	@IsNotEmpty({ message: "Поле не должно быть пустым." })
	@ApiProperty({ description: "Пароль пользователя.", example: "testPassword" })
	readonly password: string;

	@ApiProperty({ description: "Имя пользователя.", example: "string" })
	readonly firstName: string;

	@ApiProperty({ description: "Фамилия пользователя.", example: "string" })
	readonly lastName: string;

	@ApiProperty({ description: "Пароль пользователя.", example: "date" })
	readonly birthday: Date;

	@ApiProperty({ description: "Идентификатор роли пользователя", example: "number" })
	readonly roleId: number;

	@ApiProperty({ description: "Идентификатор клиента системы", example: "number" })
	readonly customerId: number;

	@ApiProperty({ description: "Идентификатор адреса.", example: "number" })
	readonly addressId: number;

	@ApiProperty({ description: "Идентификатор статуса.", example: "number" })
	readonly statusId: number;
}
