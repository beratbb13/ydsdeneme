import { TestBed } from '@angular/core/testing';

import { UserScoreService } from './user-score.service';

describe('UserScoreService', () => {
  let service: UserScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
