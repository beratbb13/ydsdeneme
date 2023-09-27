import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCardComponent } from './exam-card.component';

describe('ExamCardComponent', () => {
  let component: ExamCardComponent;
  let fixture: ComponentFixture<ExamCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamCardComponent]
    });
    fixture = TestBed.createComponent(ExamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
