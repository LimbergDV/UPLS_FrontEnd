import { Component, Input, OnInit } from '@angular/core';
import { PublicationService } from '../../service/publications.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
  @Input() title: string = '';
  @Input() idImage: string = '';

  imageSRC: any;

  constructor(
    private _publications: PublicationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._publications.showImg(this.idImage).subscribe({
      next: (imageBlob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.imageSRC = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
