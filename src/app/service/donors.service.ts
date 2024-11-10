import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iAccess } from '../models/iAccess';
import { iDonor } from '../models/i-donor';
import { iProfile } from '../models/i-profile';

@Injectable({
  providedIn: 'root',
})
export class DonorsService {
  private URL_BASE: string = 'http://localhost:5000/donors';
  private token: string = localStorage.getItem('token') || '';

  constructor(private _http: HttpClient) {}

  login(credentials: iAccess): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(`${this.URL_BASE}/login`, credentials, { headers });
  }

  register(newDonor: iDonor): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(`${this.URL_BASE}/add`, newDonor, { headers });
  }

  registerProfile(profile: iProfile): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(`http://localhost:5000/profile/add`, profile, {
      headers,
    });
  }

  getDonor(): Observable<iDonor> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.get<iDonor>(`http://localhost:5000/profile/profile`, {
      headers,
    });
  }

  getPhoto() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.get(`http://localhost:5000/profile/photo`, {
      headers,
      responseType: 'blob',
    });
  }

  addPhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this._http.post(`http://localhost:5000/donors/photo`, formData, {
      headers,
    });
  }

  updatePersonalInfo(newData: iDonor): Observable<any> {
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

  updateAccountInfo(newData: iDonor): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.put(`http://localhost:5000/profile/update`, newData, {
      headers,
    });
  }

  deleteAccount(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.delete(`${this.URL_BASE}/deleteAccount`, { headers });
  }
}
