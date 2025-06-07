import { IsString, IsNotEmpty, IsEmail, IsUrl, IsUUID, IsDate } from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string

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
  
  @IsDate()
  @IsNotEmpty()
  created_at: Date;
  
  @IsDate()
  @IsNotEmpty()
  updated_at: Date;
}
