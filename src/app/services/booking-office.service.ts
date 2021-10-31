import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingOfficeDto } from '../models/booking-office/BookingOfficeDto';
import { BaseResponse } from '../models/response/base-response';
import { PagingAndFilterResponse } from '../models/response/paging-and-filter-response';
import { AppConstant } from '../_constant/app-constant';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BookingOfficeService {

  constructor(private baseService: BaseService) { }

  create(data) {
    return this.baseService.post<BaseResponse>(`${AppConstant.API_URL}/BookingOffice/Create`, data);
  }

  update(data) {
    return this.baseService.put<BaseResponse>(`${AppConstant.API_URL}/BookingOffice/Update`, data);
  }

  delete(id) {
    let params = new HttpParams().set("id", id);
    return this.baseService.delete<BaseResponse>(`${AppConstant.API_URL}/BookingOffice/Delete`, params);
  }

  getById(id): Observable<BookingOfficeDto> {
    let params = new HttpParams().set("id", id);
    return this.baseService.get<BookingOfficeDto>(`${AppConstant.API_URL}/BookingOffice/GetById`, params);
  }

  pagingAndFilter(data): Observable<PagingAndFilterResponse<BookingOfficeDto>> {
    return this.baseService.post<PagingAndFilterResponse<BookingOfficeDto>>(`${AppConstant.API_URL}/BookingOffice/GetByPagingAndFilter`, data);
  }

}
