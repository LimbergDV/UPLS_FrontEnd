import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPublicationComponent } from './add-publication/add-publication.component';
import { ViewPublicationComponent } from './view-publication/view-publication.component';
import { PostPublicationComponent } from './post-publication/post-publication.component';
import { ListPublicationsComponent } from './list-publications/list-publications.component';
import { FormsModule } from '@angular/forms';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { CardsComponent } from './cards/cards.component';




@NgModule({
  declarations: [
    AddPublicationComponent,
    ViewPublicationComponent,
    PostPublicationComponent,
    ListPublicationsComponent,
    MyPublicationsComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PublicationsModule { }
