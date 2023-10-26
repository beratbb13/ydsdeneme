import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultDetailComponent } from './exam-result-detail.component';

describe('ExamResultDetailComponent', () => {
  let component: ExamResultDetailComponent;
  let fixture: ComponentFixture<ExamResultDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamResultDetailComponent]
    });
    fixture = TestBed.createComponent(ExamResultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
