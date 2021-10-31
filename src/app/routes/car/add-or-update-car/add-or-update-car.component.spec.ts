import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateCarComponent } from './add-or-update-car.component';

describe('AddOrUpdateCarComponent', () => {
  let component: AddOrUpdateCarComponent;
  let fixture: ComponentFixture<AddOrUpdateCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
