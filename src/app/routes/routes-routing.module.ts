import { AuthLayoutComponent } from './../layouts/auth-layout/auth-layout.component';
import { RoleGuard } from './../guard/role.guard';
import { UserLayoutComponent } from './../layouts/user-layout/user-layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { AddOrUpdateEmployeeComponent } from './employee/add-or-update-employee/add-or-update-employee.component';
import { ListBookingOfficeComponent } from './booking-office/list-booking-office/list-booking-office.component';
import { AddOrUpdateBookingOfficeComponent } from './booking-office/add-or-update-booking-office/add-or-update-booking-office.component';
import { AddOrUpdateCarComponent } from './car/add-or-update-car/add-or-update-car.component';
import { ListCarComponent } from './car/list-car/list-car.component';
import { AddOrUpdateParkinglotComponent } from './parkinglot/add-or-update-parkinglot/add-or-update-parkinglot.component';
import { ListParkinglotComponent } from './parkinglot/list-parkinglot/list-parkinglot.component';
import { ListTicketComponent } from './ticket/list-ticket/list-ticket.component';
import { AddOrUpdateTicketComponent } from './ticket/add-or-update-ticket/add-or-update-ticket.component';
import { AddOrUpdateTripComponent } from './trip/add-or-update-trip/add-or-update-trip.component';
import { ListTripComponent } from './trip/list-trip/list-trip.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'login' },
    ],
    // canActivate: [AuthGuard],
  },

  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: 'employee',
        children: [
          {
            path: 'list',
            component: ListEmployeeComponent
          },
          {
            path: 'create',
            component: AddOrUpdateEmployeeComponent
          },
          {
            path: ':id',
            component: AddOrUpdateEmployeeComponent
          },
        ]
      },

      {
        path: 'booking-office',
        children: [
          {
            path: 'list',
            component: ListBookingOfficeComponent
          },
          {
            path: 'create',
            component: AddOrUpdateBookingOfficeComponent
          },
          {
            path: ':id',
            component: AddOrUpdateBookingOfficeComponent
          },
        ]
      },

      {
        path: 'car',
        children: [
          {
            path: 'list',
            component: ListCarComponent
          },
          {
            path: 'create',
            component: AddOrUpdateCarComponent
          },
          {
            path: ':id',
            component: AddOrUpdateCarComponent
          },
        ]
      },

      {
        path: 'parkinglot',
        children: [
          {
            path: 'list',
            component: ListParkinglotComponent
          },
          {
            path: 'create',
            component: AddOrUpdateParkinglotComponent
          },
          {
            path: ':id',
            component: AddOrUpdateParkinglotComponent
          },
        ]
      },

      {
        path: 'ticket',
        children: [
          {
            path: 'list',
            component: ListTicketComponent
          },
          {
            path: 'create',
            component: AddOrUpdateTicketComponent
          },
          {
            path: ':id',
            component: AddOrUpdateTicketComponent
          },
        ]
      },

      {
        path: 'trip',
        children: [
          {
            path: 'list',
            component: ListTripComponent
          },
          {
            path: 'create',
            component: AddOrUpdateTripComponent
          },
          {
            path: ':id',
            component: AddOrUpdateTripComponent
          },
        ]
      },

      { path: 'dashboard', component: DashboardComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
    canActivate: [AuthGuard, RoleGuard],
  },

  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
