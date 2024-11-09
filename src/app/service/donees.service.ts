import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iAccess } from '../models/iAccess';
import { iDonee } from '../models/i-donee';

@Injectable({
  providedIn: 'root',
})
export class DoneesService {
  private URL_BASE: string = 'http://localhost:5000/donees';
  private token: string = localStorage.getItem('token') || '';

  constructor(private _http: HttpClient) {}

  login(credentials: iAccess): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(`${this.URL_BASE}/login`, credentials, { headers });
  }

  register(newDonee: iDonee): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(`${this.URL_BASE}/add`, newDonee, { headers });
  }

  getDonee(): Observable<iDonee> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.get<iDonee>(`${this.URL_BASE}/profile`, { headers });
  }

  getPhoto() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.get(`${this.URL_BASE}/photo`, {
      headers,
      responseType: 'blob',
    });
  }

  updatePersonalInfo(newData: iDonee): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.put(`${this.URL_BASE}/update`, newData, { headers });
  }

  updatePersonalPSW(newPSW: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.put(`${this.URL_BASE}/update`, newPSW, { headers });
  }

  deleteAccount(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.delete(`${this.URL_BASE}/deleteAccount`, { headers });
  }
}
