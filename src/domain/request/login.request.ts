import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest {
  @ApiProperty({description: 'Логин пользователя.', example: 'testLogin'})
  readonly login: string;

  @ApiProperty({description: 'Пароль пользователя.', example: 'testPassword'})
  readonly password: string;
}