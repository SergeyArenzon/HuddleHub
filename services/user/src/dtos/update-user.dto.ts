import { UserDto } from './user.dto';
import { OmitType } from '@nestjs/mapped-types';


export class UpdateUserDto extends OmitType(UserDto, ['created_at', 'updated_at'] as const) {}