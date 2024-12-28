import { IsString, IsNotEmpty, IsEmail, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  image_url: string;
}
