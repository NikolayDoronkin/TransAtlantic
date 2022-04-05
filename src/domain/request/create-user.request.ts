import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserRequest {
  @IsNotEmpty()
  @ApiProperty({description: 'Логин пользователя.', example: 'testLogin'})
  readonly login: string;

  @IsNotEmpty()
  @ApiProperty({description: 'Пароль пользователя.', example: 'testPassword'})
  readonly password: string;
}
