import { TestBed } from '@angular/core/testing';

import { LgsQuestionsService } from './lgs-questions.service';

describe('LgsQuestionsService', () => {
  let service: LgsQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LgsQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
