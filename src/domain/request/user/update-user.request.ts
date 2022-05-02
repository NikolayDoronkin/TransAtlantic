import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserRequest {
	@ApiProperty({ description: "Идентификатор пользователя.", example: "testLogin" })
	readonly id: number;

	@ApiProperty({ description: "Имя пользователя.", example: "string" })
	readonly firstName: string;

	@ApiProperty({ description: "Фамилия пользователя.", example: "string" })
	readonly lastName: string;

	@ApiProperty({ description: "Пароль пользователя.", example: "???" })
	readonly birthday: Date;

	@ApiProperty({ description: "Идентификатор клиента системы", example: "number" })
	readonly customerId: number;

	@ApiProperty({ description: "Идентификатор адреса.", example: "number" })
	readonly addressId: number;

	@ApiProperty({ description: "Идентификатор статуса.", example: "number" })
	readonly statusId: number;
}
