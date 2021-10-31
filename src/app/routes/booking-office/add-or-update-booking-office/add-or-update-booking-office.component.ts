import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripDto } from 'src/app/models/trip/TripDto';
import { BookingOfficeService } from 'src/app/services/booking-office.service';
import { TripService } from 'src/app/services/trip.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-add-or-update-booking-office',
  templateUrl: './add-or-update-booking-office.component.html',
  styleUrls: ['./add-or-update-booking-office.component.css']
})
export class AddOrUpdateBookingOfficeComponent implements OnInit {

  createOrUpdateForm: FormGroup;
  formLabel: string;
  action: string;
  placeOption = AppConstant.OFFICE_PLACE_OPTION;
  tripOption = new Array<any>();
  constructor(
    private fb: FormBuilder,
    private bookingOfficeService: BookingOfficeService,
    private tripService: TripService,
    private toastrServicer: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createOrUpdateForm = this.fb.group({
      officeName: ['', Validators.required],
      officePhone: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      officePlace: ['', Validators.required],
      officePrice: ['', Validators.required],
      tripId: ['', Validators.required],
      startContractDeadline: ['', Validators.required],
      endContractDeadline: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTrips();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formLabel = 'Update';
      this.action = AppConstant.ACTION.UPDATE;

      this.bookingOfficeService.getById(id).subscribe({
        next: (response) => {
          if (response) {
            let fields = Object.getOwnPropertyNames(response);
            fields.forEach((field) => {
              if (field === "startContractDeadline" || field === "endContractDeadline" ) {
                let date = new Date(response[field]).toLocaleDateString(
                  'en-CA'
                );
                this.createOrUpdateForm.controls[field]?.setValue(date);

              } else {
                this.createOrUpdateForm.controls[field]?.setValue(
                  response[field]
                )
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
          response.data.forEach(trip => {
            this.tripOption.push({
              label: trip.destination, value: trip.tripId
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
    })
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
      if (typeof(data[field]) === 'string' || data[field] instanceof String) {
        data[field] = data[field].trim();
      }
    });

    if (this.action === AppConstant.ACTION.CREATE) {
      this.bookingOfficeService.create(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/booking-office/list');
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
      data['officeId'] = this.route.snapshot.paramMap.get('id');

      this.bookingOfficeService.update(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/booking-office/list');
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
