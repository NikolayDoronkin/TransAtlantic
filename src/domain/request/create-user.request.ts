import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserRequest {
  @IsNotEmpty({ message: "Поле не должно быть пустым." })
  @ApiProperty({ description: "Логин пользователя.", example: "testLogin" })
  readonly login: string;

  @IsNotEmpty({ message: "Поле не должно быть пустым." })
  @ApiProperty({ description: "Пароль пользователя.", example: "testPassword" })
  readonly password: string;
}
