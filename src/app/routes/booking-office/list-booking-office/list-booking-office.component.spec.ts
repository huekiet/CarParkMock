import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingOfficeComponent } from './list-booking-office.component';

describe('ListBookingOfficeComponent', () => {
  let component: ListBookingOfficeComponent;
  let fixture: ComponentFixture<ListBookingOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBookingOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
