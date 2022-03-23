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

//пример того, как будем делать
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return 'getAll';
  }

  @Get(':id')
  getById(@Param('id') id: string): string {
    return this.userService.getById(id);
  }

  @Post('/create')
  create(@Body() createUserRequest: CreateUserRequest) {
    const user = new User();

    user.login = createUserRequest.login;
    user.password = createUserRequest.password;

    return this.userService.create(user);
  }

  @Put()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update() {}

  @Delete()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delete() {}
}
