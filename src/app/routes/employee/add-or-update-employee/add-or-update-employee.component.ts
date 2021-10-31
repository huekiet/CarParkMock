import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-add-or-update-employee',
  templateUrl: './add-or-update-employee.component.html',
  styleUrls: ['./add-or-update-employee.component.css'],
})
export class AddOrUpdateEmployeeComponent implements OnInit {
  createOrUpdateForm: FormGroup;
  formLabel: string;
  action: string;
  departmentOption = AppConstant.DEPARTMENT_OPTION;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastrServicer: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createOrUpdateForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      employeePhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{7,10}$')],
      ],
      sex: ['', [Validators.required]],
      employeeEmail: [''],
      employeeBirthdate: ['', [Validators.required]],
      employeeAddress: [''],
      department: ['', [Validators.required]],
      account: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$'),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formLabel = 'Update';
      this.action = AppConstant.ACTION.UPDATE;
      this.employeeService.getById(id).subscribe({
        next: (response) => {
          if (response) {
            let fields = Object.getOwnPropertyNames(response);
            fields.forEach((field) => {
              if (field === 'employeeBirthdate') {
                let date = new Date(response[field]).toLocaleDateString(
                  'en-CA'
                );
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
      }    });

    if (this.action === AppConstant.ACTION.CREATE) {
      this.employeeService.create(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/employee/list');
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
      data['employeeId'] = this.route.snapshot.paramMap.get('id');

      this.employeeService.update(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigateByUrl('user/employee/list');
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
