import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripService } from 'src/app/services/trip.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-add-or-update-trip',
  templateUrl: './add-or-update-trip.component.html',
  styleUrls: ['./add-or-update-trip.component.css'],
})
export class AddOrUpdateTripComponent implements OnInit {
  createOrUpdateForm: FormGroup;
  formLabel: string;
  action: string;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private toastrServicer: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createOrUpdateForm = this.fb.group({
      maximumOnlineTicketNumber: ['', [Validators.required]],
      carType: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      departureTime: ['', [Validators.required]],
      driver: ['', [Validators.required]],
      destination: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formLabel = 'Update';
      this.action = AppConstant.ACTION.UPDATE;
      this.tripService.getById(id).subscribe({
        next: (response) => {
          if (response) {
            let fields = Object.getOwnPropertyNames(response);
            fields.forEach((field) => {
              if (field === 'departureDate') {
                let date = new Date(response[field]).toLocaleDateString(
                  'en-CA'
                );
                this.createOrUpdateForm.controls[field]?.setValue(date);

              } else if (field === 'departureTime') {
                  let date = new Date();
                  let hours = Number.parseInt(response[field].split(":")[0]);
                  let minutes = Number.parseInt(response[field].split(":")[1]);
                  date.setHours(hours);
                  date.setMinutes(minutes);
                  this.createOrUpdateForm.controls[field]?.setValue(date);
              }

              else {
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

    data["departureTime"] = `${data["departureTime"].getHours()}:${data["departureTime"].getMinutes()}`;

    if (this.action === AppConstant.ACTION.CREATE) {
      this.tripService.create(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/trip/list');
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
      data['tripId'] = this.route.snapshot.paramMap.get('id');

      this.tripService.update(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/trip/list');
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
