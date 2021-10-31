import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { PagingAndFilterRequest } from 'src/app/models/request/paging-and-filter-request';
import { TicketDto } from 'src/app/models/ticket/TicketDto';
import { TicketService } from 'src/app/services/ticket.service';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  tickets: Array<TicketDto>;
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
    private ticketService: TicketService,
    private toastrService: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  loadTickets(event = null) {
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

    this.ticketService.pagingAndFilter(data).subscribe((response) => {
      this.tickets = response.data;
      this.totalRecords = response.totalItems;
    });
  }

  viewTicket(id) {
    this.router.navigateByUrl(`user/ticket/${id}`);
  }

  deleteTicket(event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ticketService.delete(id).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadTickets();
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
