import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenemeSinaviComponent } from './deneme-sinavi.component';

describe('DenemeSinaviComponent', () => {
  let component: DenemeSinaviComponent;
  let fixture: ComponentFixture<DenemeSinaviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DenemeSinaviComponent]
    });
    fixture = TestBed.createComponent(DenemeSinaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
