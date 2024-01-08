import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueBookingComponent } from './continue-booking.component';

describe('ContinueBookingComponent', () => {
  let component: ContinueBookingComponent;
  let fixture: ComponentFixture<ContinueBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContinueBookingComponent]
    });
    fixture = TestBed.createComponent(ContinueBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
