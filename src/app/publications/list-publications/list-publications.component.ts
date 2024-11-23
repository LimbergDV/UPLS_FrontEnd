import { Component, OnInit } from '@angular/core';
import { IPublications } from '../../models/i-publications';
import { PublicationService } from '../../service/publications.service';

@Component({
  selector: 'app-list-publications',
  templateUrl: './list-publications.component.html',
  styleUrl: './list-publications.component.css'
})
export class ListPublicationsComponent implements OnInit {
  publications: IPublications[] = [];

  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.publicationService.getAllPublications().subscribe({
      next: (data: IPublications[]) => {
        this.publications = data;

        // Cargar la imagen y asignar la URL a cada publicación
        this.publications.forEach((publication) => {
          if (publication.image) {
            this.publicationService.showImg(publication.image).subscribe({
              next: (blob) => {
                // Crear una URL a partir del blob y asignarlo a la propiedad imagePreview
                publication.image = URL.createObjectURL(blob);
              },
              error: (error) =>
                console.error(`Error al cargar la imagen para la publicación ${publication.image}:`, error),
            });
          }
        });
      },
      error: (error) => console.error('Error al cargar publicaciones:', error),
    });
  }

  deletePublications(id: number): void {
    this.publicationService.deletePublication(id.toString()).subscribe({
      next: () => {
        console.log('Publicación eliminada');
        this.loadPublications();
      },
      error: (error) => console.error('Error al eliminar publicación', error),
    });
  }
}
