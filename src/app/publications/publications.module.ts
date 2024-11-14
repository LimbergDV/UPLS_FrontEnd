import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPublicationComponent } from './add-publication/add-publication.component';
import { ViewPublicationComponent } from './view-publication/view-publication.component';
import { PostPublicationComponent } from './post-publication/post-publication.component';
import { ListPublicationsComponent } from './list-publications/list-publications.component';



@NgModule({
  declarations: [
    AddPublicationComponent,
    ViewPublicationComponent,
    PostPublicationComponent,
    ListPublicationsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PublicationsModule { }
