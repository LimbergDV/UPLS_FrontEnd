import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailsCards',
  templateUrl: './details-cards.component.html',
  styleUrl: './details-cards.component.css',
})
export class DetailsCardsComponent implements OnInit {
  @Input() id_publicaction: string = '';

  ngOnInit(): void {
    console.log(this.id_publicaction);
    ;
  }
}
