import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Providers } from './enums';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, ProviderUserDto } from './dtos';
import { AuthController } from './auth.controller';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    @Inject('USER_SERVICE')
    private rabbitClient: ClientProxy,
  ) {}

  generateToken(payload: Record<string, string>): string {
    this.logger.log('Sign JWT token');
    return this.jwtService.sign(payload);
  }

  async authenticateProvider(auth: AuthDto): Promise<ProviderUserDto> {
    {
      let user = {} as ProviderUserDto;
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
