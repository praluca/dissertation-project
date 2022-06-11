import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers: any;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.headers = new HttpHeaders({
      'x-auth-token': this.localStorageService.get('x-auth-token'),
    });
  }

  registerUser(user: any) {
    const url = 'http://localhost:3000/api/user';
    return this.http.post(url, user);
  }

  loginUser(user: any) {
    const url = 'http://localhost:3000/api/auth';
    return this.http.post(url, user);
  }
}
