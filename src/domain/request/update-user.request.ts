import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserRequest {
  @ApiProperty({description: 'Идентификатор пользователя.', example: 'testLogin'})
  readonly id: number;

  @ApiProperty({description: 'Логин пользователя.', example: 'testLogin'})
  readonly login: string;

  @ApiProperty({description: 'Пароль пользователя.', example: 'testPassword'})
  readonly password: string;
}
