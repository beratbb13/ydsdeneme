import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenemeExamComponent } from './deneme-exam.component';

describe('DenemeExamComponent', () => {
  let component: DenemeExamComponent;
  let fixture: ComponentFixture<DenemeExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DenemeExamComponent]
    });
    fixture = TestBed.createComponent(DenemeExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
