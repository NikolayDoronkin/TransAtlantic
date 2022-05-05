import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import {CreateAddressRequest} from "./create-address.request";

export class CreateUserManagementRequest {
	@IsNotEmpty({ message: "Поле не должно быть пустым." })
	@ApiProperty({ description: "Почта пользователя.", example: "testLogin" })
	readonly email: string;

	@IsNotEmpty({ message: "Поле не должно быть пустым." })
	@ApiProperty({ description: "Имя пользователя.", example: "string" })
	readonly firstName: string;

	@IsNotEmpty({ message: "Поле не должно быть пустым." })
	@ApiProperty({ description: "Фамилия пользователя.", example: "string" })
	readonly lastName: string;

	@ApiProperty({ description: "Дата рождения пользователя.", example: "date" })
	readonly birthday: Date;

	@IsNotEmpty({ message: "Поле не должно быть пустым." })
	@ApiProperty({ description: "Идентификатор роли пользователя", example: "number" })
	readonly roleId: number;

	@ApiProperty({ description: "Адрес пользователя", example: "number" })
	readonly addressRequest: CreateAddressRequest;

}
