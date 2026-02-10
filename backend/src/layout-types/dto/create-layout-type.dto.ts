import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateLayoutTypeDto {
  @IsString()
  code: string;

  @IsString()
  nameEn: string;

  @IsString()
  nameRu: string;

  @IsInt()
  @IsOptional()
  sortOrder?: number;
}
