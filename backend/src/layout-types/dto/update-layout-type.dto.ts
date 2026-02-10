import { PartialType } from '@nestjs/mapped-types';
import { CreateLayoutTypeDto } from './create-layout-type.dto';

export class UpdateLayoutTypeDto extends PartialType(CreateLayoutTypeDto) {}
