import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateParkinglotComponent } from './add-or-update-parkinglot.component';

describe('AddOrUpdateParkinglotComponent', () => {
  let component: AddOrUpdateParkinglotComponent;
  let fixture: ComponentFixture<AddOrUpdateParkinglotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateParkinglotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateParkinglotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
