import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParkinglotDto } from 'src/app/models/parkinglot/ParkinglotDto';
import { CarService } from 'src/app/services/car.service';
import { ParkinglotService } from 'src/app/services/parkinglot.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-add-or-update-car',
  templateUrl: './add-or-update-car.component.html',
  styleUrls: ['./add-or-update-car.component.css'],
})
export class AddOrUpdateCarComponent implements OnInit {
  createOrUpdateForm: FormGroup;
  formLabel: string;
  action: string;
  companyOption = AppConstant.CAR_COMPANY;
  parkinglotOption = new Array<any>();
  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private parkinglotService: ParkinglotService,
    private toastrServicer: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createOrUpdateForm = this.fb.group({
      licensePlate: ['', [Validators.required]],
      carColor: [''],
      carType: [''],
      company: ['', [Validators.required]],
      parkId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadAllParkinglot();
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.formLabel = 'Update';
      this.action = AppConstant.ACTION.UPDATE;

      this.carService.getById(id).subscribe({
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

  loadAllParkinglot() {
    this.parkinglotService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          response.data.forEach((item) => {
            this.parkinglotOption.push({
              label: item.parkName,
              value: item.parkId,
            });
          });
        } else {
          this.toastrServicer.error(
            response.errors ? response.errors : AppConstant.ERRORS.UNKNOWN_ERROR
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

    if (this.action === AppConstant.ACTION.CREATE) {
      this.carService.create(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/car/list');
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
      data['licensePlate'] = this.route.snapshot.paramMap.get('id');

      this.carService.update(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/car/list');
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
