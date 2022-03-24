import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'src/domain/user';
import { CreateUserRequest } from '../domain/request/create-user.request';
import { UserService } from '../service/user.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

//пример того, как будем делать

@Controller('user')
@ApiTags('user-controller')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAll')
  @ApiOperation({summary: 'Получения всех пользователей.'})
  @ApiResponse({status: 200, type: [User]})
  getAll() {
    return 'getAll';
  }

  @Get('/getById/:id')
  @ApiOperation({summary: 'Получения пользователя по идентификатору.'})
  @ApiResponse({status: 200, type: User})
  getById(@Param('id') id: string): string {
    return this.userService.getById(id);
  }

  @Post('/create')
  @ApiOperation({summary: 'Создания пользователя.'})
  @ApiResponse({status: 201, type: User})
  create(@Body() createUserRequest: CreateUserRequest) {
    const user = new User();

    user.login = createUserRequest.login;
    user.password = createUserRequest.password;

    return this.userService.create(user);
  }

  @Put()
  @ApiOperation({summary: 'Обновления пользователя.'})
  @ApiResponse({status: 200, type: User})
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update() {}

  @Delete()
  @ApiOperation({summary: 'Удаления пользователя по идентификатору.'})
  @ApiResponse({status: 200, type: ApiOkResponse})
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delete() {}
}
