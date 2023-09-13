import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextModalComponent } from './text-modal.component';

describe('TextModalComponent', () => {
  let component: TextModalComponent;
  let fixture: ComponentFixture<TextModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextModalComponent]
    });
    fixture = TestBed.createComponent(TextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
