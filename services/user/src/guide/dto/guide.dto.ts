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
import { UserDto } from 'src/dtos';

export class GuideDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Type(() => UserDto)
  user: UserDto; // Transforms the user relation into the UserDto

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}

export class CreateGuideDto extends OmitType(GuideDto, [
  'id',
  'created_at',
  'updated_at',
] as const) {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;
}
export class UpdateGuideDto extends OmitType(GuideDto, [
  'created_at',
  'updated_at',
] as const) {}
export class ResponseGuideDto extends GuideDto {}
