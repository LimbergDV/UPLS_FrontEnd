import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { iFeatureMaps } from '../models/iFeatureMap';
import { iDataPlace } from '../models/iDataPlace';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  private URL_BASE: string = 'http://localhost:5000/locations';

  constructor(private _http: HttpClient) {}

  getPlacesMap() {}

  getUbicationPlaces(): Observable<iFeatureMaps[]> {
    return this._http.get<iDataPlace[]>(`${this.URL_BASE}/`).pipe(
      map((response) => {
        return response.map((location) => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [location.longitude, location.latitude],
            },
            properties: {
              popupContent: location.name_place,
              name: location.id_blood_bank
            },
          } as iFeatureMaps;
        });
      })
    );
  }
}
