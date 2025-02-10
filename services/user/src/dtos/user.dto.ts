import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsUrl,
  IsUUID,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

export class UserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

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

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'created_at',
  'updated_at',
] as const) {}
export class UpdateUserDto extends OmitType(UserDto, [
  'created_at',
  'updated_at',
] as const) {}
export class ResponseUserDto extends UserDto {}
