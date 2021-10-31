import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { PagingAndFilterRequest } from 'src/app/models/request/paging-and-filter-request';
import { TripDto } from 'src/app/models/trip/TripDto';
import { TripService } from 'src/app/services/trip.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-list-trip',
  templateUrl: './list-trip.component.html',
  styleUrls: ['./list-trip.component.css'],
})
export class ListTripComponent implements OnInit {
  trips: Array<TripDto>;
  first = 0;
  rows = 10;
  totalRecords: number = 0;

  filterChosen: string;
  userSearch: string;

  constructor(
    private tripService: TripService,
    private toastrService: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  loadTrips(event = null) {
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

    this.tripService.pagingAndFilter(data).subscribe((response) => {
      this.trips = response.data;
      this.totalRecords = response.totalItems;
    });
  }

  viewTrip(id) {
    this.router.navigateByUrl(`user/trip/${id}`);
  }

  deleteTrip(event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tripService.delete(id).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadTrips();
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
