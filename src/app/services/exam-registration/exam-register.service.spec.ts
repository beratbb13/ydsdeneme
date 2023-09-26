import { TestBed } from '@angular/core/testing';

import { ExamRegisterService } from './exam-register.service';

describe('ExamRegisterService', () => {
  let service: ExamRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
