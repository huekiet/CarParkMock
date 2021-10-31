import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddOrUpdateEmployeeComponent } from './employee/add-or-update-employee/add-or-update-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { AddOrUpdateCarComponent } from './car/add-or-update-car/add-or-update-car.component';
import { AddOrUpdateTripComponent } from './trip/add-or-update-trip/add-or-update-trip.component';
import { ListTripComponent } from './trip/list-trip/list-trip.component';
import { ListTicketComponent } from './ticket/list-ticket/list-ticket.component';
import { AddOrUpdateTicketComponent } from './ticket/add-or-update-ticket/add-or-update-ticket.component';
import { AddOrUpdateParkinglotComponent } from './parkinglot/add-or-update-parkinglot/add-or-update-parkinglot.component';
import { AddOrUpdateBookingOfficeComponent } from './booking-office/add-or-update-booking-office/add-or-update-booking-office.component';
import { ListBookingOfficeComponent } from './booking-office/list-booking-office/list-booking-office.component';
import { ListParkinglotComponent } from './parkinglot/list-parkinglot/list-parkinglot.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { ListCarComponent } from './car/list-car/list-car.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    AddOrUpdateEmployeeComponent,
    ListEmployeeComponent,
    AddOrUpdateCarComponent,
    AddOrUpdateTripComponent,
    ListTripComponent,
    ListTicketComponent,
    AddOrUpdateTicketComponent,
    AddOrUpdateParkinglotComponent,
    AddOrUpdateBookingOfficeComponent,
    ListBookingOfficeComponent,
    ListParkinglotComponent,
    ListCarComponent,
    AddOrUpdateCarComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    CalendarModule,
    ConfirmPopupModule,
    InputNumberModule,
  ],
  exports: [RouterModule],
  providers: [ConfirmationService],
})
export class RoutesModule {}
