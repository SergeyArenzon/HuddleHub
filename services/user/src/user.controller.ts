import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller()
export class UserController {
  @Get()
  getUser() {
    return { first_name: 'John', last_name: 'Doe' };
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return {
      id,
    };
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
