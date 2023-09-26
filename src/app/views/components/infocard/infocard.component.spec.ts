import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocardComponent } from './infocard.component';

describe('InfocardComponent', () => {
  let component: InfocardComponent;
  let fixture: ComponentFixture<InfocardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfocardComponent]
    });
    fixture = TestBed.createComponent(InfocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
