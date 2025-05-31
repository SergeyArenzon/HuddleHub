import { IsString, IsUUID, IsArray } from 'class-validator';
import { ResponseSubCategoryDto } from '../../sub-category/dto/response-sub-category.dto';

export class ResponseCategoryDto {
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsArray()
  subcategories: ResponseSubCategoryDto[];
} 