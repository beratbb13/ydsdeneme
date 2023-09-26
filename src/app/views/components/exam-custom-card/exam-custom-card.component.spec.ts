import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCustomCardComponent } from './exam-custom-card.component';

describe('ExamCustomCardComponent', () => {
  let component: ExamCustomCardComponent;
  let fixture: ComponentFixture<ExamCustomCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamCustomCardComponent]
    });
    fixture = TestBed.createComponent(ExamCustomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
