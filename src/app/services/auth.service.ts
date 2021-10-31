import { CookieService } from 'ngx-cookie-service';
import { AppConstant } from './../_constant/app-constant';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LoginResponse } from '../models/response/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private baseService: BaseService,
    private cookieService: CookieService
  ) {}

  login(data): Observable<LoginResponse> {
    return this.baseService.post<LoginResponse>(
      `${AppConstant.API_URL}/Authentication/Login`,
      data
    );
  }

  register(data): Observable<LoginResponse> {
    return this.baseService.post<LoginResponse>(
      `${AppConstant.API_URL}/auth/register`,
      data
    );
  }

  deleteAllCookie() {
    this.cookieService.deleteAll();
  }
}
