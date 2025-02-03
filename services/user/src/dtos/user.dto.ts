import { IsString, IsNotEmpty, IsEmail, IsUrl, IsUUID, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

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
  @Type(() => Date)
  created_at: Date;
  
  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
