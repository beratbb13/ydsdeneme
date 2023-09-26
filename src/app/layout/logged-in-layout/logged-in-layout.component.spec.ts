import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInLayoutComponent } from './logged-in-layout.component';

describe('LoggedInLayoutComponent', () => {
  let component: LoggedInLayoutComponent;
  let fixture: ComponentFixture<LoggedInLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedInLayoutComponent]
    });
    fixture = TestBed.createComponent(LoggedInLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
