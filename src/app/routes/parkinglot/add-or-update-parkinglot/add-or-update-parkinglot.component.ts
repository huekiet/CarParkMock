import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParkinglotService } from 'src/app/services/parkinglot.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-add-or-update-parkinglot',
  templateUrl: './add-or-update-parkinglot.component.html',
  styleUrls: ['./add-or-update-parkinglot.component.css'],
})
export class AddOrUpdateParkinglotComponent implements OnInit {
  createOrUpdateForm: FormGroup;
  formLabel: string;
  action: string;
  placeOption = AppConstant.PARKING_PLACE_OPTION;
  parkStatusOption = AppConstant.PARK_STATUS_OPTION;
  constructor(
    private fb: FormBuilder,
    private parkinglotService: ParkinglotService,
    private toastrServicer: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createOrUpdateForm = this.fb.group({
      parkName: ['', Validators.required],
      parkPlace: ['', Validators.required],
      parkArea: ['', Validators.required],
      parkPrice: ['', Validators.required],
      parkStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formLabel = 'Update';
      this.action = AppConstant.ACTION.UPDATE;
      this.parkinglotService.getById(id).subscribe({
        next: (response) => {
          if (response) {
            let fields = Object.getOwnPropertyNames(response);
            fields.forEach((field) => {
              this.createOrUpdateForm.controls[field]?.setValue(
                response[field]
              );
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
      if (typeof(data[field]) === 'string' || data[field] instanceof String) {
        data[field] = data[field].trim();
      }
    });

    if (this.action === AppConstant.ACTION.CREATE) {
      this.parkinglotService.create(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/parkinglot/list');
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
      data['parkId'] = this.route.snapshot.paramMap.get('id');

      this.parkinglotService.update(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/parkinglot/list');
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
