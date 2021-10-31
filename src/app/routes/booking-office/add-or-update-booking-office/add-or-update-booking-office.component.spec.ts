import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateBookingOfficeComponent } from './add-or-update-booking-office.component';

describe('AddOrUpdateBookingOfficeComponent', () => {
  let component: AddOrUpdateBookingOfficeComponent;
  let fixture: ComponentFixture<AddOrUpdateBookingOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateBookingOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateBookingOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
