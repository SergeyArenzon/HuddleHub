import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { CreateUserDto, UserDto } from '../dtos';
import { UserService } from './user.service';
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller("")
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private usersService: UserService) {}

  // findUser() {
  //   return { first_name: 'John', last_name: 'Doe' };
  // }

  // @Get('/:id')
  // getUserById(@Param('id') id: string) {
  //   const user = this.usersService.findOne(id);
  //   return user;
  // }

  @Post('/auth')
  @HttpCode(200)
  async createOrFind(@Body() body: CreateUserDto): Promise<UserDto> {
    return await this.usersService.createOrFind(body);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // @HttpCode(201)
  // createUser(@Body() body: CreateUserDto) {
  //   this.usersService.create(body);
  // }

  // // EVENTS
  // @EventPattern('user_create')
  // @UsePipes(ValidationPipe)
  // async createUserEvent(@Payload() user: CreateUserDto) {
  //   this.usersService.create(user);
  // }
}
