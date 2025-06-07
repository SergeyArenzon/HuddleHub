import { IsString, IsNotEmpty, IsEnum, IsJWT } from 'class-validator';
import { Providers } from '../enums';

export class AuthDto {
  @IsJWT()
  @IsNotEmpty()
  jwt: string;

  @IsEnum(Providers)
  @IsNotEmpty()
  provider: string;
}
