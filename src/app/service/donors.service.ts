import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iAccess } from '../models/iAccess';
import { iDonor } from '../models/i-donor';
import { iProfile } from '../models/i-profile';
import { iLocalities } from '../models/iLocalities';
import { iDonorSearch } from '../models/iDonorSearch';

@Injectable({
  providedIn: 'root',
})
export class DonorsService {
  private URL_BASE: string = 'http://localhost:5000';
  private token: string = localStorage.getItem('token') || '';

  constructor(private _http: HttpClient) {}

  login(credentials: iAccess): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(`${this.URL_BASE}/donors/login`, credentials, {
      headers,
    });
  }

  register(newDonor: iDonor): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(`${this.URL_BASE}/donors/add`, newDonor, {
      headers,
    });
  }

  registerProfile(profile: iProfile): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(`${this.URL_BASE}/profile/add`, profile, {
      headers,
    });
  }

  getDonor(): Observable<iDonor> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.get<iDonor>(`${this.URL_BASE}/profile/profile`, {
      headers,
    });
  }

  getPhoto() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.get(`${this.URL_BASE}/profile/photo`, {
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

    return this._http.post(`${this.URL_BASE}/donors/addPhoto`, formData, {
      headers,
    });
  }

  updatePersonalInfo(newData: iDonor): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.put(`${this.URL_BASE}/donors/update`, newData, {
      headers,
    });
  }

  updatePersonalPSW(newPSW: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.put(`${this.URL_BASE}/donors/update`, newPSW, {
      headers,
    });
  }

  updateAccountInfo(newData: iDonor): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.put(`${this.URL_BASE}/profile/update`, newData, {
      headers,
    });
  }

  deleteAccount(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.delete(`${this.URL_BASE}/donors/deleteAccount`, {
      headers,
    });
  }

  getLocalities(): Observable<iLocalities[]> {
    return this._http.get<iLocalities[]>(`${this.URL_BASE}/donors/localities`);
  }

  // Búsquedas
  getByBloodType(type: string): Observable<iDonorSearch[]> {
    return this._http.get<iDonorSearch[]>(
      `${this.URL_BASE}/profile/searchByBlood/${type}`
    );
  }

  getByLocality(locality: string): Observable<iDonorSearch[]> {
    return this._http.get<iDonorSearch[]>(
      `${this.URL_BASE}/profile/searchByLocality/${locality}`
    );
  }

  getByCompatibility(type: string): Observable<iDonorSearch[]> {
    return this._http.get<iDonorSearch[]>(
      `${this.URL_BASE}/profile/searchByCompatibility/${type}`
    );
  }

  getByBloodTypeLocality(
    type: string,
    locality: string
  ): Observable<iDonorSearch[]> {
    const body = {
      blood_type: type,
      locality: locality,
    };
    return this._http.post<iDonorSearch[]>(
      `${this.URL_BASE}/profile/BloodLocality`,
      body
    );
  }

  getByCompatibilityLocality(
    type: string,
    locality: string
  ): Observable<iDonorSearch[]> {
    const body = {
      blood_type: type,
      locality: locality,
    };
    return this._http.post<iDonorSearch[]>(
      `${this.URL_BASE}/profile/CompatibilityLocality`,
      body
    );
  }

  getDonorNT(id_donor: number): Observable<iDonor> {
    return this._http.get<iDonor>(
      `${this.URL_BASE}/profile/search/${id_donor}`
    );
  }

  getPhotoNT(id: string) {
    return this._http.get(`${this.URL_BASE}/profile/photo/user/${id}`, {
      responseType: 'blob',
    });
  }

  getDonorById(id: string): Observable<iDonor> {
    return this._http.get<iDonor>(
      `${this.URL_BASE}/profile/search/${parseInt(id)}`
    );
  }
}
