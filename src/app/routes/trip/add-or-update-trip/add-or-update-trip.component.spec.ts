import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateTripComponent } from './add-or-update-trip.component';

describe('AddOrUpdateTripComponent', () => {
  let component: AddOrUpdateTripComponent;
  let fixture: ComponentFixture<AddOrUpdateTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
