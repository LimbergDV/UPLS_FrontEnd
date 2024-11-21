import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChatComponent } from './view-chat/view-chat.component';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../service/chat.service';

@NgModule({
  declarations: [ViewChatComponent],
  imports: [CommonModule, FormsModule],
  providers: [ChatService],
})
export class ChatModule {}
