import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroButtonComponent } from './retro-button.component';

describe('RetroButtonComponent', () => {
  let component: RetroButtonComponent;
  let fixture: ComponentFixture<RetroButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RetroButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
