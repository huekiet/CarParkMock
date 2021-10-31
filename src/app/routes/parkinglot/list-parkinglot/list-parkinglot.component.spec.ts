import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParkinglotComponent } from './list-parkinglot.component';

describe('ListParkinglotComponent', () => {
  let component: ListParkinglotComponent;
  let fixture: ComponentFixture<ListParkinglotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParkinglotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParkinglotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
