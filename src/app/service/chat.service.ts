import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private URL_BASE = 'http://localhost:3000'; // URL de tu backend

  constructor() {
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
}
