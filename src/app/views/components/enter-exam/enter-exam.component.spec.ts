import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterExamComponent } from './enter-exam.component';

describe('EnterExamComponent', () => {
  let component: EnterExamComponent;
  let fixture: ComponentFixture<EnterExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterExamComponent]
    });
    fixture = TestBed.createComponent(EnterExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
