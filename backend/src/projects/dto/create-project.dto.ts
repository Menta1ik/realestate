import { IsString, IsNotEmpty, IsInt, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUnitTypeDto {
  @IsString()
  @IsOptional()
  kind: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  priceFromAED: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  sizeFromSqFt?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  pricePerSqFt?: number;

  @IsString()
  @IsOptional()
  image?: string;
}

export class CreatePhotoDto {
  @IsString()
  url: string;
}

export class CreateAmenityDto {
  @IsString()
  code: string;
}

export class CreateTagDto {
  @IsString()
  name: string;
}

export class CreateDocumentDto {
  @IsString()
  labelEn: string;

  @IsString()
  labelRu: string;

  @IsString()
  type: string;

  @IsString()
  url: string;
}

export class CreateProjectDto {
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUnitTypeDto)
  @IsOptional()
  unitTypes?: CreateUnitTypeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePhotoDto)
  @IsOptional()
  photos?: CreatePhotoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAmenityDto)
  @IsOptional()
  amenities?: CreateAmenityDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  @IsOptional()
  tags?: CreateTagDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentDto)
  @IsOptional()
  documents?: CreateDocumentDto[];
}
