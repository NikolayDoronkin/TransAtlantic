import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class LoginRequest {
  @ApiProperty({description: 'Почта пользователя.', example: 'testEmail'})
  readonly email: string;

  @ApiProperty({description: 'Пароль пользователя.', example: 'testPassword'})
  readonly password: string;
}
