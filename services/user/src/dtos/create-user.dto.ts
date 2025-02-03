import { UserDto } from './user.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto extends OmitType(UserDto, ['created_at', 'updated_at'] as const) {}
