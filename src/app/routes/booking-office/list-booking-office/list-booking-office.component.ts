import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { BookingOfficeDto } from 'src/app/models/booking-office/BookingOfficeDto';
import { PagingAndFilterRequest } from 'src/app/models/request/paging-and-filter-request';
import { BookingOfficeService } from 'src/app/services/booking-office.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-list-booking-office',
  templateUrl: './list-booking-office.component.html',
  styleUrls: ['./list-booking-office.component.css']
})
export class ListBookingOfficeComponent implements OnInit {

  offices: Array<BookingOfficeDto>;
  first = 0;
  rows = 10;
  totalRecords: number = 0;
  filterOption= [
    {label: "Name", value: "name"},
    {label: "Phone", value: "phone"},
    {label: "Place", value: "place"}
  ]

  filterChosen: string;
  userSearch: string;

  constructor(
    private bookingOfficeService: BookingOfficeService,
    private toastrService: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  loadOffices(event = null) {
    let data = new PagingAndFilterRequest();

    if (event !== null) {
      this.first = event.first;
      this.rows = event.rows;
    }

    if (this.filterChosen && this.userSearch) {
      data.filter = [];
      data.filter.push({
        field: this.filterChosen,
        fieldValue: this.userSearch,
      });
    }

    data.pageIndex = Math.ceil(this.first / this.rows);
    data.pageSize = this.rows;

    this.bookingOfficeService.pagingAndFilter(data).subscribe((response) => {
      this.offices = response.data;
      this.totalRecords = response.totalItems;
    });
  }

  viewOffice(id) {
    this.router.navigateByUrl(`user/booking-office/${id}`);
  }

  deleteOffice(event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookingOfficeService.delete(id).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadOffices();
            } else {
              this.toastrService.error(
                response.errors
                  ? response.errors
                  : AppConstant.ERRORS.UNKNOWN_ERROR
              );
            }
          },
          error: (error) =>
            this.toastrService.error(AppConstant.ERRORS.UNKNOWN_ERROR),
        });
      },
      reject: () => {
        //reject action
      },
    });
  }

}
