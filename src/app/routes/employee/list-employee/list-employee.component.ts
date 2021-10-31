import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { EmployeeDto } from 'src/app/models/employee/EmployeeDto';
import { PagingAndFilterRequest } from 'src/app/models/request/paging-and-filter-request';
import { EmployeeService } from 'src/app/services/employee.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employees: Array<EmployeeDto>
  first = 0;
  rows = 10;
  totalRecords: number = 0;

  filterOption = [
    {label: "Name", value: "employeename"},
    {label: "Address", value: "address"},
    {label: "Phone", value: "phonenumber"},
    {label: "Department", value: "department"},
  ]

  filterChosen: string
  userSearch: string;

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    ) {

    }

  ngOnInit() {
  }

  loadEmployees(event = null) {
    let data = new PagingAndFilterRequest();

    if (event !== null) {
      this.first = event.first;
      this.rows = event.rows;
    }

    if (this.filterChosen && this.userSearch) {
      data.filter = [];
      data.filter.push({
        field: this.filterChosen,
        fieldValue: this.userSearch
      });
    }

    data.pageIndex = Math.ceil(this.first/this.rows);
    data.pageSize = this.rows;

    this.employeeService.pagingAndFilter(data).subscribe(response => {
      this.employees = response.data;
      this.totalRecords = response.totalItems;
    })
  }

  viewEmployee(id) {
    this.router.navigateByUrl(`user/employee/${id}`);
  }

  deleteEmployee(event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.employeeService.delete(id).subscribe({
            next: response => {
              if (response.success) {
                this.loadEmployees();
              } else {
                this.toastrService.error(response.errors? response.errors: AppConstant.ERRORS.UNKNOWN_ERROR);
              }
            },
            error: error => this.toastrService.error(AppConstant.ERRORS.UNKNOWN_ERROR)
          })
      },
      reject: () => {
          //reject action
      }
  });
  }
}
