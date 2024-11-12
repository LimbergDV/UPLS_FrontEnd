import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPublicationComponent } from './add-publication/add-publication.component';
import { ViewPublicationComponent } from './view-publication/view-publication.component';



@NgModule({
  declarations: [
    AddPublicationComponent,
    ViewPublicationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PublicationsModule { }
