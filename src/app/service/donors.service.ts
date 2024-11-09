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
  private token: string = localStorage.getItem('token') || "";

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
    return this._http.post(`http://localhost:5000/profile/add`, profile, { headers });
  }

  getDonor(): Observable<iDonor>{
    const headers = new HttpHeaders({
      'Authorizacion': `${this.token}`,
    });
    return this._http.get<iDonor>(`${this.URL_BASE}/profile`, { headers})
  }
}
