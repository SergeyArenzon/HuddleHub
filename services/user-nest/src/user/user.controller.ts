import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  @Get()
  getUser() {
    return {};
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return {
      id,
    };
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return body;
  }
}
