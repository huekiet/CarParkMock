import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/response/base-response';
import { PagingAndFilterResponse } from '../models/response/paging-and-filter-response';
import { TicketDto } from '../models/ticket/TicketDto';
import { AppConstant } from '../_constant/app-constant';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private baseService: BaseService) { }

  create(data) {
    return this.baseService.post<BaseResponse>(`${AppConstant.API_URL}/Ticket/Create`, data);
  }

  update(data) {
    return this.baseService.put<BaseResponse>(`${AppConstant.API_URL}/Ticket/Update`, data);
  }

  delete(id) {
    let params = new HttpParams().set("id", id);
    return this.baseService.delete<BaseResponse>(`${AppConstant.API_URL}/Ticket/Delete`, params);
  }

  getById(id): Observable<TicketDto> {
    let params = new HttpParams().set("id", id);
    return this.baseService.get<TicketDto>(`${AppConstant.API_URL}/Ticket/GetById`, params);
  }

  pagingAndFilter(data): Observable<PagingAndFilterResponse<TicketDto>> {
    return this.baseService.post<PagingAndFilterResponse<TicketDto>>(`${AppConstant.API_URL}/Ticket/GetByPagingAndFilter`, data);
  }
}
