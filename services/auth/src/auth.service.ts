import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Providers } from './enums';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_SERVICE')
    private rabbitClient: ClientProxy,
  ) {}

  async createUser(user: any) {
    this.rabbitClient.emit('user_create', user);
  }

  generateToken(payload: Record<string, string>): string {
    return this.jwtService.sign(payload);
  }

  async authenticateProvider(auth: {
    jwt: string;
    provider: Providers;
  }): Promise<CreateUserDto> {
    {
      let user = {} as CreateUserDto;
      switch (auth.provider) {
        case Providers.GOOGLE:
          const googleResponse = await fetch(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${auth.jwt}`,
          );
          const googleResponseJson = await googleResponse.json();
          user = {
            email: googleResponseJson.email,
            first_name: googleResponseJson.given_name,
            last_name: googleResponseJson.family_name,
            image_url: googleResponseJson.picture,
          };
          break;
        default:
          break;
      }
      return user;
    }
  }
}
