import { Module } from '@nestjs/common';
import { LayoutTypesService } from './layout-types.service';
import { LayoutTypesController } from './layout-types.controller';

@Module({
  controllers: [LayoutTypesController],
  providers: [LayoutTypesService],
})
export class LayoutTypesModule {}
