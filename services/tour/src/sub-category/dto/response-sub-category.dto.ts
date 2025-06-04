import { IsString, IsUUID } from "class-validator";

export class ResponseSubCategoryDto {
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
} 