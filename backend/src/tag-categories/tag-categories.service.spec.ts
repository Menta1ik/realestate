import { Test, TestingModule } from '@nestjs/testing';
import { TagCategoriesService } from './tag-categories.service';

describe('TagCategoriesService', () => {
  let service: TagCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagCategoriesService],
    }).compile();

    service = module.get<TagCategoriesService>(TagCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
