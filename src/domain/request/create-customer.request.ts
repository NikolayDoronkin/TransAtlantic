import {ApiProperty} from "@nestjs/swagger";

export class CreateCustomerRequest {
	@ApiProperty({description: 'Почта пользователя.', example: 'testEmail@gmail.com'})
	email: string;

	@ApiProperty({description: 'Название кастомера.', example: 'customer'})
	name: string;

	@ApiProperty({description: 'Имя пользователя.', example: 'Ivan'})
	firstName: string;

	@ApiProperty({description: 'Фамилия пользователя.', example: 'Ivanov'})
	lastName: string;
}