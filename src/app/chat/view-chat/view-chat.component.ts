import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './view-chat.component.html',
  styleUrl: './view-chat.component.css',
})
export class ViewChatComponent implements OnInit {
  conversations: any[] = [];
  currentConversationId: string | null = null;
  messages: any[] = [];
  newMessage: string = '';
  private token = localStorage.getItem('token');
  private rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';

  constructor(
    private http: HttpClient,
    private socketService: ChatService,
    private rouoter: Router
  ) {}

  ngOnInit() {
    if (this.rol_access == 'NoAccess') {
      this.rouoter.navigate(['/signIn']);
    }
    this.loadConversations();
    this.socketService.onNewMessage().subscribe((message) => {
      if (message.conversationId === this.currentConversationId) {
        this.messages.push(message);
      }
    });
  }

  loadConversations() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    if (this.rol_access == 'donee') {
      this.http
        .get<any[]>(`http://localhost:3000/conversations/donee`, { headers })
        .subscribe(
          (conversations) => {
            console.log(conversations);

            this.conversations = conversations;
          },
          (error) => console.error('Error al cargar las conversaciones:', error)
        );
    }

    if (this.rol_access == 'donor') {
      this.http
        .get<any[]>(`http://localhost:3000/conversations/donor`, { headers })
        .subscribe(
          (conversations) => {
            console.log(conversations);

            this.conversations = conversations;
          },
          (error) => console.error('Error al cargar las conversaciones:', error)
        );
    }
  }

  joinConversation(conversationId: string) {
    this.currentConversationId = conversationId;
    this.messages = [];

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.socketService.joinConversation(conversationId);

    this.http
      .get<any[]>(
        `http://localhost:3000/conversations/${conversationId}/messages`,
        { headers }
      )
      .subscribe(
        (messages) => (this.messages = messages),
        (error) => console.error('Error al cargar los mensajes:', error)
      );
  }

  sendMessage(event: Event) {
    event.preventDefault();
    if (this.newMessage.trim() && this.currentConversationId) {
      const message = {
        content: this.newMessage,
        senderId: this.token,
        conversationId: this.currentConversationId,
      };

      this.socketService.sendMessage(message);
      this.newMessage = '';
    }
  }
}
