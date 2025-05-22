import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ description: 'The unique identifier of the category' })
  id: string;

  @ApiProperty({ description: 'The name of the category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the category' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The creation timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'The last update timestamp' })
  updated_at: Date;
}

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the category' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ description: 'The name of the category', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'The description of the category', required: false })
  @IsString()
  @IsOptional()
  description?: string;
} 