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
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  // ENDPOINTS
  @HttpCode(200)
  @Get('/health')
  health() {}

  @Get()
  findUser() {
    return { first_name: 'John', last_name: 'Doe' }; 
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    // const user = this.usersService.findOne(id);
    // return user;
  }

  @Post()
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() body: any,
  ): Promise<any> {
    const user = await this.authService.authenticateProvider(body);

    const res = await fetch('http://user:4001/create-or-find', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const authUser = await res.json();
    if (!authUser) {
      throw new UnauthorizedException();
    }

    const token = this.authService.generateToken({ userId: authUser.id });
    response.cookie('accessToken', token, { httpOnly: true, maxAge: 3600000, secure: true });    
    return authUser;
  }
}
