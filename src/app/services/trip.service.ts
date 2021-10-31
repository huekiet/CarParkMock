import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/response/base-response';
import { PagingAndFilterResponse } from '../models/response/paging-and-filter-response';
import { TripDto } from '../models/trip/TripDto';
import { AppConstant } from '../_constant/app-constant';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private baseService: BaseService) { }

  create(data) {
    return this.baseService.post<BaseResponse>(`${AppConstant.API_URL}/Trip/Create`, data);
  }

  update(data) {
    return this.baseService.put<BaseResponse>(`${AppConstant.API_URL}/Trip/Update`, data);
  }

  delete(id) {
    let params = new HttpParams().set("id", id);
    return this.baseService.delete<BaseResponse>(`${AppConstant.API_URL}/Trip/Delete`, params);
  }

  getById(id): Observable<TripDto> {
    let params = new HttpParams().set("id", id);
    return this.baseService.get<TripDto>(`${AppConstant.API_URL}/Trip/GetById`, params);
  }

  pagingAndFilter(data): Observable<PagingAndFilterResponse<TripDto>> {
    return this.baseService.post<PagingAndFilterResponse<TripDto>>(`${AppConstant.API_URL}/Trip/GetByPagingAndFilter`, data);
  }

  getAll(): Observable<BaseResponse> {
    return this.baseService.get<BaseResponse>(`${AppConstant.API_URL}/Trip/GetAll`);
  }
}
