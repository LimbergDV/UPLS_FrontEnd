import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-publication',
  templateUrl: './details-publication.component.html',
  styleUrl: './details-publication.component.css',
})
export class DetailsPublicationComponent implements OnInit {
  id_pubication: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id_pubication = this.route.snapshot.paramMap.get('id')!;
  }

}
