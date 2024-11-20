import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  
  private rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';
  private token = localStorage.getItem('token');

  constructor(private socketService: ChatService, private rouoter: Router) {}

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
    this.socketService.getConversations(this.rol_access).subscribe(
      (conversations) => {
        console.log(conversations);
        this.conversations = conversations;

      },
      (error) => {
        console.error('Error al cargar las conversaciones:', error);
        Swal.fire({
          title: '¡Opss...!',
          text: 'Occurrió un error',
          icon: 'error',
        });
      }
    );
  }

  joinConversation(conversationId: string) {
    this.currentConversationId = conversationId;
    this.messages = [];

    this.socketService.joinConversation(conversationId);

    this.socketService.getConversations(conversationId).subscribe(
      (messages) => (this.messages = messages),
      (error) => {
        console.error('Error al cargar las conversaciones:', error);
        Swal.fire({
          title: '¡Opss...!',
          text: 'Occurrió un error',
          icon: 'error',
        });
      }
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
