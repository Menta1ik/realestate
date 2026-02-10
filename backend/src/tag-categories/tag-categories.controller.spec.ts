import { Test, TestingModule } from '@nestjs/testing';
import { TagCategoriesController } from './tag-categories.controller';

describe('TagCategoriesController', () => {
  let controller: TagCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagCategoriesController],
    }).compile();

    controller = module.get<TagCategoriesController>(TagCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
