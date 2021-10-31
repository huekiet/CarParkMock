import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ParkinglotDto } from 'src/app/models/parkinglot/ParkinglotDto';
import { PagingAndFilterRequest } from 'src/app/models/request/paging-and-filter-request';
import { ParkinglotService } from 'src/app/services/parkinglot.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-list-parkinglot',
  templateUrl: './list-parkinglot.component.html',
  styleUrls: ['./list-parkinglot.component.css']
})
export class ListParkinglotComponent implements OnInit {

  parkinglots: Array<ParkinglotDto>
  first = 0;
  rows = 10;
  totalRecords: number = 0;

  filterOption = [
    {label: "Area", value: "parkarea"},
    {label: "Name", value: "parkname"},
    {label: "Place", value: "parkplace"},
    {label: "Price", value: "parkprice"},
  ]

  filterChosen: string
  userSearch: string;

  constructor(
    private parkinglotService: ParkinglotService,
    private toastrService: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    ) {

    }

  ngOnInit() {
  }

  loadParkinglots(event = null) {
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

    this.parkinglotService.pagingAndFilter(data).subscribe(response => {
      this.parkinglots = response.data;
      this.totalRecords = response.totalItems;
    })
  }

  viewParkinglot(id) {
    this.router.navigateByUrl(`user/parkinglot/${id}`);
  }

  deleteParkinglot(event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.parkinglotService.delete(id).subscribe({
            next: response => {
              if (response.success) {
                this.loadParkinglots();
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
