import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from '../models/employee/EmployeeDto';
import { BaseResponse } from '../models/response/base-response';
import { PagingAndFilterResponse } from '../models/response/paging-and-filter-response';
import { AppConstant } from '../_constant/app-constant';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private baseService: BaseService) { }

  create(data) {
    return this.baseService.post<BaseResponse>(`${AppConstant.API_URL}/Employee/Create`, data);
  }

  update(data) {
    return this.baseService.put<BaseResponse>(`${AppConstant.API_URL}/Employee/Update`, data);
  }

  delete(id) {
    let params = new HttpParams().set("id", id);
    return this.baseService.delete<BaseResponse>(`${AppConstant.API_URL}/Employee/Delete`, params);
  }

  getById(id): Observable<EmployeeDto> {
    let params = new HttpParams().set("id", id);
    return this.baseService.get<EmployeeDto>(`${AppConstant.API_URL}/Employee/GetById`, params);
  }

  pagingAndFilter(data): Observable<PagingAndFilterResponse<EmployeeDto>> {
    return this.baseService.post<PagingAndFilterResponse<EmployeeDto>>(`${AppConstant.API_URL}/Employee/GetByPagingAndFilter`, data);
  }
}
