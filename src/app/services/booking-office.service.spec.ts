import { TestBed } from '@angular/core/testing';

import { BookingOfficeService } from './booking-office.service';

describe('BookingOfficeService', () => {
  let service: BookingOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
