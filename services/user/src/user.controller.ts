import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private rabbitClient,
    private usersService: UserService,
  ) {}

  // ENDPOINTS
  @HttpCode(200)
  @Get('/health')
  health() {}

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
    this.usersService.create(body);
  }

  // EVENTS
  @EventPattern('user-create')
  createUserEvent(@Payload() user: CreateUserDto) {
    this.usersService.create(user);
  }
}
