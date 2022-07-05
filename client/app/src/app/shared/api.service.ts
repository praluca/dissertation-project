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

  getTop4Doctors() {
    const url = 'http://localhost:3000/api/doctors/top-doctors';
    return this.http.get(url, { headers: this.headers });
  }

  getConsultations(id: any) {
    const url = 'http://localhost:3000/api/consultations/' + id;
    return this.http.get(url, { headers: this.headers });
  }

  deleteConsultation(id: any) {
    const url = 'http://localhost:3000/api/consultations/' + id;
    return this.http.delete(url, { headers: this.headers });
  }

  getInvestigations() {
    const url = 'http://localhost:3000/api/investigations';
    return this.http.get(url, { headers: this.headers });
  }

  getVitalInformations(id: any) {
    const url = 'http://localhost:3000/api/vitalinformations/' + id;
    return this.http.get(url, { headers: this.headers });
  }
  editVitalInformations(id: any, body: any) {
    const url = 'http://localhost:3000/api/vitalinformations/' + id;
    return this.http.patch(url, body, { headers: this.headers });
  }
  addVitalInformations(userId: any, body: any) {
    const url = 'http://localhost:3000/api/vitalinformations/' + userId;
    return this.http.post(url, body, { headers: this.headers });
  }

  getAppointements(userId: any) {
    const url = 'http://localhost:3000/api/appointements/' + userId;
    return this.http.get(url, { headers: this.headers });
  }

  searchDoctorsAppointements(
    specialisationValue: any,
    locationValue: any,
    dateValue: any
  ) {
    const url = 'http://localhost:3000/api/doctors';
    return this.http.get(url, {
      params: {
        specialisation: specialisationValue,
        location: locationValue,
        date: dateValue,
      },
      headers: this.headers,
    });
  }

  addAppointements(body: any, userId: any, doctorId: any) {
    const url =
      'http://localhost:3000/api/appointements/' + userId + '/' + doctorId;
    return this.http.post(url, body, { headers: this.headers });
  }

  getProducts() {
    const url = 'http://localhost:3000/api/products';
    return this.http.get(url, { headers: this.headers });
  }

  getProductsFiltered(filter: any) {
    const url = 'http://localhost:3000/api/products/filtered';
    return this.http.get(url, {
      params: {
        filter: filter,
      },
    });
  }
}
