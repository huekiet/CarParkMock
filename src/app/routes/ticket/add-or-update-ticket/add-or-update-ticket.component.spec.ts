import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateTicketComponent } from './add-or-update-ticket.component';

describe('AddOrUpdateTicketComponent', () => {
  let component: AddOrUpdateTicketComponent;
  let fixture: ComponentFixture<AddOrUpdateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
