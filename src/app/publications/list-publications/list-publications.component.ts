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
  imagesMap: Map<string, Blob> = new Map();  // Mapa para almacenar los Blobs de las imágenes



  constructor(private publicationService: PublicationService){}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.publicationService.getAllPublications().subscribe({
      next: (data: IPublications[]) => {
        this.publications = data;

        // Iterar por cada publicación y cargar la imagen si el atributo "image" está presente
        this.publications.forEach((publication) => {
          if (publication.image) {
            this.publicationService.showImg(publication.image).subscribe({
              next: (blob) => {
                // Guardar el Blob en el Map utilizando el atributo "image" como clave
                this.imagesMap.set(publication.image, blob);
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

  createImageFromBlob(imageId: string): string | null {
    const blob = this.imagesMap.get(imageId);
    return blob ? URL.createObjectURL(blob) : null;
  }


  deletePublications(id: number): void {
    this.publicationService.deletePublication(id.toString()).subscribe({
      next: () => {
        console.log('Publicación eliminada');
        this.loadPublications();
      },
      error: (error) => console.error('Error al eliminar publicación', error)
    });
  }

  downloadIMG(){}


}
