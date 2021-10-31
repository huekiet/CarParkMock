import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParkinglotDto } from '../models/parkinglot/ParkinglotDto';
import { BaseResponse } from '../models/response/base-response';
import { PagingAndFilterResponse } from '../models/response/paging-and-filter-response';
import { AppConstant } from '../_constant/app-constant';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParkinglotService {

  constructor(private baseService: BaseService) { }

  create(data) {
    return this.baseService.post<BaseResponse>(`${AppConstant.API_URL}/Parkinglot/Create`, data);
  }

  update(data) {
    return this.baseService.put<BaseResponse>(`${AppConstant.API_URL}/Parkinglot/Update`, data);
  }

  delete(id) {
    let params = new HttpParams().set("id", id);
    return this.baseService.delete<BaseResponse>(`${AppConstant.API_URL}/Parkinglot/Delete`, params);
  }

  getById(id): Observable<ParkinglotDto> {
    let params = new HttpParams().set("id", id);
    return this.baseService.get<ParkinglotDto>(`${AppConstant.API_URL}/Parkinglot/GetById`, params);
  }

  pagingAndFilter(data): Observable<PagingAndFilterResponse<ParkinglotDto>> {
    return this.baseService.post<PagingAndFilterResponse<ParkinglotDto>>(`${AppConstant.API_URL}/Parkinglot/GetByPagingAndFilter`, data);
  }

  getAll(): Observable<BaseResponse> {
    return this.baseService.get<BaseResponse>(`${AppConstant.API_URL}/Parkinglot/GetAll`);
  }
}
