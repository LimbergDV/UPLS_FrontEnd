import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from '../../service/publications.service';
import { IPublications } from '../../models/i-publications';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrl: './add-publication.component.css'
})

export class AddPublicationComponent {
  title = '';
  description = '';
  image: File | null = null; // almacenar la imagen
  imagePreview: string | ArrayBuffer | null = null;
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

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // Método para agregar una publicación
  onSubmit(): void {
    if (!this.image) {
      Swal.fire({
        title: 'Error',
        text: 'No se ha seleccionado ninguna imagen.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Crear el objeto base sin la imagen
    const newPublicationBase = {
      title: this.title,
      description: this.description,
      date_limit: new Date(this.date_limit),
      blood_type: this.blood_type,
      donors_number: this.donors_number
    };

    // Subir la imagen primero y luego completar el objeto
    this.publicationService.addImg(this.image).pipe(
      switchMap((response: { fileId: string }) => {
        console.log('ID de imagen recibido:', response.fileId);

        // Crear el objeto completo con la imagen
        const newPublication: IPublications = {
          ...newPublicationBase,
          image: response.fileId // Añadir la imagen (ID)
        };

        // Retornar el observable para agregar la publicación
        return this.publicationService.addPublication(newPublication);
      })
    ).subscribe({
      next: (response) => {
        console.log('Publicación agregada:', response);

        Swal.fire({
          title: '¡Éxito!',
          text: 'Tu publicación ha sido realizada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/publications']);
      },
      error: (error) => {
        console.error('Error al agregar publicación:', error);

        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al agregar la publicación. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
    });
  }

}
