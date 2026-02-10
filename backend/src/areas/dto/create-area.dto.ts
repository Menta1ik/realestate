import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  featuresEn?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  featuresRu?: string[];

  @IsString()
  @IsOptional()
  locationEn?: string;

  @IsString()
  @IsOptional()
  locationRu?: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @IsString()
  @IsOptional()
  descriptionRu?: string;
}
