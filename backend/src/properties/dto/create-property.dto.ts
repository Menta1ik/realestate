import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  ref: string;

  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @IsString()
  @IsNotEmpty()
  developer: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  handoverEn: string;

  @IsString()
  @IsNotEmpty()
  handoverRu: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  priceFromAED: number;

  @IsString()
  @IsOptional()
  paymentPlanEn?: string;

  @IsString()
  @IsOptional()
  paymentPlanRu?: string;

  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @IsString()
  @IsNotEmpty()
  descriptionRu: string;

  @IsString()
  @IsNotEmpty()
  bedrooms: string;

  @IsString()
  @IsOptional()
  bathrooms?: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  areaId: string;

  @IsString()
  @IsOptional()
  developerId?: string;
}
