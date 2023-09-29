import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterExamComponent } from './register-exam.component';

describe('RegisterExamComponent', () => {
  let component: RegisterExamComponent;
  let fixture: ComponentFixture<RegisterExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterExamComponent]
    });
    fixture = TestBed.createComponent(RegisterExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
