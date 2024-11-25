import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPublicationComponent } from './add-publication/add-publication.component';
import { ViewPublicationComponent } from './view-publication/view-publication.component';
import { ListPublicationsComponent } from './list-publications/list-publications.component';
import { FormsModule } from '@angular/forms';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { CardsComponent } from './cards/cards.component';
import { MatTooltip } from '@angular/material/tooltip';
import { DetailsCardsComponent } from './details-cards/details-cards.component';
import { DetailsPublicationComponent } from './details-publication/details-publication.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AddPublicationComponent,
    ViewPublicationComponent,
    ListPublicationsComponent,
    MyPublicationsComponent,
    CardsComponent,
    DetailsCardsComponent,
    DetailsPublicationComponent,
  ],
  imports: [CommonModule, FormsModule, MatTooltip, RouterModule],
  exports: [],
})
export class PublicationsModule {}
