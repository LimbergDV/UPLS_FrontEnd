import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { IComments } from '../models/icomments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}
  private token: string = localStorage.getItem('token') || '';



  addComment(postId: string, content: string): Observable<IComments> {
    const token = this.token; // Asegúrate de que `this.token` tenga el valor correcto.
    
    if (!token) {
      console.error('El token JWT no está disponible.');
      return throwError(() => new Error('Token no disponible'));
    }
    
    // Configurar las cabeceras con el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { id_post: postId, content };
    
    return this.http.post<IComments>(`${this.apiUrl}/add`, body, { headers });
  }
  
  

  showComment(){}

}