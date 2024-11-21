import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DonorsService } from '../../service/donors.service';
import { iDonor } from '../../models/i-donor';
import { DoneesService } from '../../service/donees.service';
import { CheckJWTService } from '../../service/check-jwt.service';

@Component({
  selector: 'app-chat',
  templateUrl: './view-chat.component.html',
  styleUrl: './view-chat.component.css',
})
export class ViewChatComponent implements OnInit, AfterViewChecked {
  conversations: any[] = [];
  currentConversationId: string | null = null;
  messages: any[] = [];
  newMessage: string = '';
  contacts: iDonor[] = [];
  contactsView: any[] = [];
  idConversacion: string = '';
  photoUrls: { [id: string]: string } = {};
  selectedIndex: number | null = null;

  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';

  constructor(
    private socketService: ChatService,
    private router: Router,
    private _donors: DonorsService,
    private _donees: DoneesService,
    private _check: CheckJWTService
  ) {}

  ngOnInit() {
    this._check.checkToken().subscribe({
      next(value) {
        console.log(value.ok);
      },
      error: (err) => {
        if (err.status == 403) {
          this.router.navigate(['/signIn']);
        }
      },
    });

    if (this.rol_access == 'NoAccess') {
      this.router.navigate(['/signIn']);
    } 

    this.loadConversations();
    this.socketService.onNewMessage().subscribe((message) => {
      if (message.conversationId === this.currentConversationId) {
        this.messages.push(message);
      }
    });
    console.log(this.contactsView);
  }

  loadConversations() {
    this.socketService.getConversations(this.rol_access).subscribe(
      (conversations) => {
        this.conversations = conversations;
        console.log(conversations);
        this.searchUserData();
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

  searchUserData() {
    if (this.rol_access == 'donee') {
      this.conversations.forEach((conversation) => {
        this._donors.getDonorNT(conversation.participants.id_donor).subscribe({
          next: (response) => {
            this.loadViewContact(response, conversation._id);
          },
          error: (err) => {
            console.log(err);
          },
        });
      });
    }
    if (this.rol_access == 'donor') {
      this.conversations.forEach((conversation) => {
        this._donees.getDoneeNT(conversation.participants.id_donee).subscribe({
          next: (response) => {
            this.loadViewContact(response, conversation._id);
          },
          error: (err) => {
            console.log(err);
          },
        });
      });
    }
  }

  loadViewContact(contact: any, id_conversation: string) {
    const contactView = {
      conversationId: id_conversation,
      name: contact.first_name + ' ' + contact.last_name,
      photo: contact.photo,
    };
    this.contactsView.push(contactView);
    if (this.rol_access == 'donee') {
      this.loadPhotosDonors(contact);
    }

    if (this.rol_access == 'donor') {
      this.loadPhotosDonees(contact);
    }
  }

  loadPhotosDonors(contact: any) {
    console.log('Hola');
    this._donors.getPhotoNT(contact.photo).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.photoUrls[contact.photo] = url;
      },
      error: (err) => {
        console.error('Error loading photo for', contact.name, err);
      },
    });
  }

  loadPhotosDonees(contact: any) {
    console.log('Hola');
    this._donees.getPhotoNT(contact.photo).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.photoUrls[contact.photo] = url;
      },
      error: (err) => {
        console.error('Error loading photo for', contact.name, err);
      },
    });
  }

  joinConversation(conversationId: string, index: number) {
    this.currentConversationId = conversationId;
    this.messages = [];

    this.socketService.joinConversation(conversationId);

    this.socketService.getMessagesConversation(conversationId).subscribe(
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

    if (this.selectedIndex === index) {
      this.selectedIndex = null; // Si haces clic en el mismo, deseleccionarlo
    } else {
      this.selectedIndex = index; // Si haces clic en otro div, seleccionarlo
    }
  }

  sendMessage(event: Event) {
    event.preventDefault();
    if (this.newMessage.trim() && this.currentConversationId) {
      const message = {
        content: this.newMessage,
        senderId: this.rol_access,
        conversationId: this.currentConversationId,
      };

      this.socketService.sendMessage(message);
      this.newMessage = '';
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  @ViewChild('messageContainer') private messageContainer:
    | ElementRef
    | undefined;
  scrollToBottom() {
    if (this.messageContainer?.nativeElement) {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    }
  }
}
