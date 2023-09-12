import { TestBed } from '@angular/core/testing';

import { ExamCategoryService } from './exam-category.service';

describe('ExamCategoryService', () => {
  let service: ExamCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
