import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeDenemeComponent } from './before-deneme.component';

describe('BeforeDenemeComponent', () => {
  let component: BeforeDenemeComponent;
  let fixture: ComponentFixture<BeforeDenemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeforeDenemeComponent]
    });
    fixture = TestBed.createComponent(BeforeDenemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
