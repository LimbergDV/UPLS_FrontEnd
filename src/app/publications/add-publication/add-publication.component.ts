import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from '../../service/publications.service';
import { IPublications } from '../../models/i-publications';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrl: './add-publication.component.css'
})

export class AddPublicationComponent {
  id_donee = 31;
  title = '';
  description = '';
  image: File | null = null; // almacenar la imagen
  date_limit = '';
  blood_type = ''; // valor por defecto
  donors_number = 0;

  constructor(
    private publicationService: PublicationService,
    public router: Router
  ) {}

  // Método para manejar la carga de la imagen
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  // Método para agregar una publicación
  onSubmit(): void {
    if (!this.image) {
      console.error('No se ha seleccionado ninguna imagen');
      return; // Detener el proceso si no hay imagen
    }
  
    // Preparamos el objeto base con los datos de la publicación sin la imagen
    const newPublication: Omit<IPublications, 'image'> = {
      id_donee: this.id_donee,
      title: this.title,
      description: this.description,
      date_limit: new Date(this.date_limit),
      blood_type: this.blood_type,
    };
  
    // Subir la imagen primero
    this.publicationService.addImg(this.image).pipe(
      switchMap((response: { fileId: string }) => {
        console.log('ID de imagen recibido:', response.fileId);
  
        // Creamos el objeto de publicación completo con el fileId de la imagen
        const completePublication: IPublications = {
          ...newPublication,
          image: response.fileId, // Agregamos el ID de la imagen aquí
        };
  
        // Retornamos el observable para guardar la publicación
        return this.publicationService.addPublication(completePublication);
      })
    ).subscribe({
      next: (response) => {
        console.log('Publicación agregada:', response);
        this.router.navigate(['/publications']); // Navegar a la lista de publicaciones
      },
      error: (error) => {
        console.error('Error al agregar publicación:', error);
      },
    });
  }
  
}



