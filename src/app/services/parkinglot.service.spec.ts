import { TestBed } from '@angular/core/testing';

import { ParkinglotService } from './parkinglot.service';

describe('ParkinglotService', () => {
  let service: ParkinglotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkinglotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
