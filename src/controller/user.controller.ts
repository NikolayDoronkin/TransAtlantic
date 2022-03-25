import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards
} from "@nestjs/common";
import { User } from 'src/domain/user';
import { CreateUserRequest } from '../domain/request/create-user.request';
import { UserService } from '../service/user.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../configuration/jwt-auth-guard";

//пример того, как будем делать

@Controller('user')
@ApiTags('user-controller')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAll')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: 200, type: [User]})
  @ApiOperation({summary: 'Получения всех пользователей.'})
  getAll() {
    return this.userService.getAll();
  }

  @Get('/getById/:id')
  @ApiResponse({status: 200, type: User})
  @ApiOperation({summary: 'Получения пользователя по идентификатору.'})
  getById(@Param('id') id: string): string {
    return this.userService.getById(id);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: 201, type: User})
  @ApiOperation({summary: 'Создания пользователя.'})
  create(@Body() createUserRequest: CreateUserRequest) {
    const user = new User();

    user.login = createUserRequest.login;
    user.password = createUserRequest.password;

    return this.userService.create(user);
  }

  @Put()
  @ApiResponse({status: 200, type: User})
  @ApiOperation({summary: 'Обновления пользователя.'})
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update() {}

  @Delete()
  @ApiResponse({status: 200, type: ApiOkResponse})
  @ApiOperation({summary: 'Удаления пользователя по идентификатору.'})
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delete() {}
}
