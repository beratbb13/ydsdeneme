import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoOnComponent } from './go-on.component';

describe('GoOnComponent', () => {
  let component: GoOnComponent;
  let fixture: ComponentFixture<GoOnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoOnComponent]
    });
    fixture = TestBed.createComponent(GoOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
