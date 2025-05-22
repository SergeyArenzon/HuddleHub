import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class SubCategoryDto {
  @ApiProperty({ description: 'The unique identifier of the sub-category' })
  id: string;

  @ApiProperty({ description: 'The name of the sub-category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the sub-category' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The ID of the parent category' })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({ description: 'The creation timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'The last update timestamp' })
  updated_at: Date;
}

export class CreateSubCategoryDto {
  @ApiProperty({ description: 'The name of the sub-category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the sub-category' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The ID of the parent category' })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;
}

export class UpdateSubCategoryDto {
  @ApiProperty({ description: 'The name of the sub-category', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'The description of the sub-category', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The ID of the parent category', required: false })
  @IsUUID()
  @IsOptional()
  category_id?: string;
} 