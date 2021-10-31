import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../models/car/CarDto';
import { BaseResponse } from '../models/response/base-response';
import { PagingAndFilterResponse } from '../models/response/paging-and-filter-response';
import { AppConstant } from '../_constant/app-constant';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private baseService: BaseService) { }

  create(data) {
    return this.baseService.post<BaseResponse>(`${AppConstant.API_URL}/Car/Create`, data);
  }

  update(data) {
    return this.baseService.put<BaseResponse>(`${AppConstant.API_URL}/Car/Update`, data);
  }

  delete(id) {
    let params = new HttpParams().set("id", id);
    return this.baseService.delete<BaseResponse>(`${AppConstant.API_URL}/Car/Delete`, params);
  }

  getById(id): Observable<CarDto> {
    let params = new HttpParams().set("id", id);
    return this.baseService.get<CarDto>(`${AppConstant.API_URL}/Car/GetById`, params);
  }

  pagingAndFilter(data): Observable<PagingAndFilterResponse<CarDto>> {
    return this.baseService.post<PagingAndFilterResponse<CarDto>>(`${AppConstant.API_URL}/Car/GetByPagingAndFilter`, data);
  }

  getAll(): Observable<BaseResponse> {
    return this.baseService.get<BaseResponse>(`${AppConstant.API_URL}/Car/GetAll`);
  }
}
