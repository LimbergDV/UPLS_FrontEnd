import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPublications } from '../../models/i-publications';
import { PublicationService } from '../../service/publications.service';
import { CheckJWTService } from '../../service/check-jwt.service';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrl: './my-publications.component.css',
})
export class MyPublicationsComponent implements OnInit {
  listPublications: IPublications[] = [];

  constructor(
    private router: Router,
    private _publications: PublicationService
  ) {}
  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this._publications.getPublicationByIdDonee().subscribe({
      next: (data: IPublications[]) => {
        this.listPublications = data;
        console.log(this.listPublications);
        // Cargar la imagen y asignar la URL a cada publicación
      },
      error: (error) => console.error('Error al cargar publicaciones:', error),
    });
  }

  redirectionToAdd(): void {
    this.router.navigate(['/addPublication']);
  }

  showDetails(id: string) {
    this.router.navigate(['/detailsPublications', id]);
  }
}
