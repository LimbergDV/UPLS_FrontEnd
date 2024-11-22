import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private URL_BASE = 'http://localhost:3000'; // URL de tu backend
  private token = localStorage.getItem('token');

  constructor(private _http: HttpClient) {
    this.socket = io(this.URL_BASE);
  }

  joinConversation(conversationId: string): void {
    this.socket.emit('joinConversation', conversationId);
  }

  sendMessage(message: any): void {
    this.socket.emit('sendMessage', message);
  }

  onNewMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }

  createConversation(id_donor: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this._http.get(`${this.URL_BASE}/conversations/add/${id_donor}`, {
      headers,
    });
  }

  getConversations(rol: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this._http.get<any[]>(`${this.URL_BASE}/conversations/${rol}`, {
      headers,
    });
  }

  getMessagesConversation(conversationId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this._http.get<any[]>(
      `${this.URL_BASE}/conversations/messages/${conversationId}`,
      { headers }
    );
  }

  deleteConversation(user: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this._http.delete(`${this.URL_BASE}/conversations/for${user}`, {
      headers,
    });
  }
}
