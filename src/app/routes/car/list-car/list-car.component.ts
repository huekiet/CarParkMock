import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { CarDto } from 'src/app/models/car/CarDto';
import { PagingAndFilterRequest } from 'src/app/models/request/paging-and-filter-request';
import { CarService } from 'src/app/services/car.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.css']
})
export class ListCarComponent implements OnInit {

  cars: Array<CarDto>
  first = 0;
  rows = 10;
  totalRecords: number = 0;

  filterOption = [
    {label: "License Plate", value: "licenseplate"},
    {label: "Type", value: "cartype"},
    {label: "Color", value: "carcolor"},
    {label: "Company", value: "company"},
  ]

  filterChosen: string
  userSearch: string;

  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    ) {

    }

  ngOnInit() {
  }

  loadCars(event = null) {
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

    this.carService.pagingAndFilter(data).subscribe(response => {
      this.cars = response.data;
      this.totalRecords = response.totalItems;
    })
  }

  viewCar(id) {
    this.router.navigateByUrl(`user/car/${id}`);
  }

  deleteEmployee(event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.carService.delete(id).subscribe({
            next: response => {
              if (response.success) {
                this.loadCars();
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
