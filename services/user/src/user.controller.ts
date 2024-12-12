import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  findUser() {
    return { first_name: 'John', last_name: 'Doe' };
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return {
      id,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  createUser(@Body() body: CreateUserDto) {
    console.log({body});
    this.usersService.create(body);
  }
}
