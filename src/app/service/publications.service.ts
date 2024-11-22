import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IPublications } from './../models/i-publications';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private apiUrl = 'http://localhost:3000/publications';

  constructor(private http: HttpClient) {}


  private token: string = localStorage.getItem('token') || '';


  addPublication(publication: IPublications): Observable<any> {
    const token = this.token;  

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/add`, publication, { headers });
  }

  getAllPublications(): Observable<IPublications[]> {
    return this.http.get<IPublications[]>(this.apiUrl);
  }

  getPublicationById(id: string): Observable<IPublications> {
    return this.http.get<IPublications>(`${this.apiUrl}/${id}`);
  }


  updatePublication(id: string, publication: IPublications): Observable<IPublications> {
    return this.http.put<IPublications>(`${this.apiUrl}/${id}`, publication);
  }

  deletePublication(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  addImg(file: File | null): Observable<{ fileId: string }> {
    if (!file) {
      throw new Error('No se ha seleccionado ningún archivo');
    }

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ fileId: string }>(`${this.apiUrl}/upload`, formData);
  }

  showImg(image: string): Observable<Blob> {
    if (!image) {
      throw new Error('No se ha proporcionado el ID de la imagen');
    }

    return this.http.get(`${this.apiUrl}/download/${image}`, { responseType: 'blob' });
  }


}
