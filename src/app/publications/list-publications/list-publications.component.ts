import { Component, OnInit } from '@angular/core';
import { IPublications } from '../../models/i-publications';
import { PublicationService } from '../../service/publications.service';

@Component({
  selector: 'app-list-publications',
  templateUrl: './list-publications.component.html',
  styleUrl: './list-publications.component.css'
})
export class ListPublicationsComponent implements OnInit {
  publications: IPublications [] = []


  constructor(private publicationService: PublicationService){}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.publicationService.getAllPublications().subscribe({
      next: (data) => (this.publications = data),
      error: (error) => console.error('Error al cargar publicaciones:', error)
    });
  }


  deletePublications(id: string): void {
    this.publicationService.deletePublication(id).subscribe({
      next: () => {
        console.log('Publicación eliminada');
        this.loadPublications();
      },
      error: (error) => console.error('Error al eliminar publicación', error)
    });
  }


}
