import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Providers } from  './enums'
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private rabbitClient: ClientProxy,
  ) {}

  async createUser(user: any) {
    console.log("send");
    
    this.rabbitClient.emit('user_create', user);
  }

  async authenticateProvider(auth: { jwt: string, provider: Providers }) : Promise<CreateUserDto> { {
    let user = {} as CreateUserDto;
    console.log("-----", auth);
    

    switch (auth.provider) {
      case Providers.GOOGLE:   
        const googleResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${auth.jwt}`);
        const googleResponseJson = await googleResponse.json(); 
        console.log({googleResponseJson});
        
        user = {
          email: googleResponseJson.email,
          first_name: googleResponseJson.given_name,
          last_name: googleResponseJson.family_name,
          image_url: googleResponseJson.picture
        }
        break;
        
      default:
        break;
    }
    return user;
    }
  }
}