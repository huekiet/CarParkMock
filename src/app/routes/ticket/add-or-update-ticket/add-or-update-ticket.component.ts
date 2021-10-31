import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { TicketService } from 'src/app/services/ticket.service';
import { TripService } from 'src/app/services/trip.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-add-or-update-ticket',
  templateUrl: './add-or-update-ticket.component.html',
  styleUrls: ['./add-or-update-ticket.component.css'],
})
export class AddOrUpdateTicketComponent implements OnInit {
  createOrUpdateForm: FormGroup;
  formLabel: string;
  action: string;
  tripOption = new Array<any>();
  carOption = new Array<any>();
  constructor(
    private fb: FormBuilder,
    private bookingOfficeService: TicketService,
    private tripService: TripService,
    private carService: CarService,
    private toastrServicer: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createOrUpdateForm = this.fb.group({
      customerName: ['', Validators.required],
      bookingTime: ['', [Validators.required]],
      tripId: ['', Validators.required],
      licensePlate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTrips();
    this.loadCars();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formLabel = 'Update';
      this.action = AppConstant.ACTION.UPDATE;

      this.bookingOfficeService.getById(id).subscribe({
        next: (response) => {
          if (response) {
            let fields = Object.getOwnPropertyNames(response);
            fields.forEach((field) => {
              if (field === 'bookingTime' && response[field]) {
                let date = new Date();
                let hours = Number.parseInt(response[field].split(':')[0]);
                let minutes = Number.parseInt(response[field].split(':')[1]);
                date.setHours(hours);
                date.setMinutes(minutes);
                this.createOrUpdateForm.controls[field]?.setValue(date);
              } else {
                this.createOrUpdateForm.controls[field]?.setValue(
                  response[field]
                );
              }
            });
          }
        },
        error: (error) => {
          this.toastrServicer.error(AppConstant.ERRORS.UNABLE_TO_RETRIEVE_DATA);
        },
      });
    } else {
      this.action = AppConstant.ACTION.CREATE;
      this.formLabel = 'Create';
    }
  }

  loadTrips() {
    this.tripService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          response.data.forEach((trip) => {
            this.tripOption.push({
              label: trip.destination,
              value: trip.tripId,
            });
          });
        } else {
          this.toastrServicer.error(
            response.errors
              ? response.errors
              : AppConstant.ERRORS.UNABLE_TO_RETRIEVE_DATA
          );
        }
      },
      error: (response) => {
        this.toastrServicer.error(
          response.errors ? response.errors : AppConstant.ERRORS.UNKNOWN_ERROR
        );
      },
    });
  }

  loadCars() {
    this.carService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          response.data.forEach((car) => {
            this.carOption.push({
              label: car.licensePlate,
              value: car.licensePlate,
            });
          });
        } else {
          this.toastrServicer.error(
            response.errors
              ? response.errors
              : AppConstant.ERRORS.UNABLE_TO_RETRIEVE_DATA
          );
        }
      },
      error: (response) => {
        this.toastrServicer.error(
          response.errors ? response.errors : AppConstant.ERRORS.UNKNOWN_ERROR
        );
      },
    });
  }

  back(): void {
    history.go(-1);
  }
  reset(): void {
    this.createOrUpdateForm.reset();
  }

  submit() {
    let data = {};
    let fields = Object.getOwnPropertyNames(this.createOrUpdateForm.controls);

    fields.forEach((field) => {
      data[field] = this.createOrUpdateForm.controls[field].value;
      if (typeof data[field] === 'string' || data[field] instanceof String) {
        data[field] = data[field].trim();
      }
    });
    data["bookingTime"]=`${data["bookingTime"].getHours()}:${data["bookingTime"].getMinutes()}`;

    if (this.action === AppConstant.ACTION.CREATE) {
      this.bookingOfficeService.create(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/ticket/list');
          } else {
            this.toastrServicer.error(
              response.errors
                ? response.errors
                : AppConstant.ERRORS.UNKNOWN_ERROR
            );
          }
        },
        error: (response) => {
          this.toastrServicer.error(
            response.errors ? response.errors : AppConstant.ERRORS.UNKNOWN_ERROR
          );
        },
      });
    } else if (this.action === AppConstant.ACTION.UPDATE) {
      data['ticketId'] = this.route.snapshot.paramMap.get('id');

      this.bookingOfficeService.update(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/ticket/list');
          } else {
            this.toastrServicer.error(
              response.errors
                ? response.errors
                : AppConstant.ERRORS.UNKNOWN_ERROR
            );
          }
        },
        error: (response) => {
          this.toastrServicer.error(
            response.errors ? response.errors : AppConstant.ERRORS.UNKNOWN_ERROR
          );
        },
      });
    }
  }
}
