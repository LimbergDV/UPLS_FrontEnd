import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from '../../service/publications.service';
import { IPublications } from '../../models/i-publications';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrl: './add-publication.component.css'
})

export class AddPublicationComponent {
  id_donee= 0 //creo que esto está mal por el object id que genera automaticamente mongodb o tambien puede ser por el unique que le puse
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
    // Preparamos el objeto con los datos del formulario
    const newPublication: IPublications = {
      id_donee: this.id_donee, // Generar un ID temporal
      title: this.title,
      description: this.description,
      image: this.image ? this.image.name : '',
      date_limit: new Date(this.date_limit),
      blood_type: this.blood_type,
      donors_number: this.donors_number
    };

    // Llamada al servicio para enviar la publicación al backend
    this.publicationService.addPublication(newPublication).subscribe({
      next: (response) => {

        console.log('Publicación agregada:', response);

        Swal.fire({
          title: '¡Éxito!',
          text: 'Tu publicación ha sido realizada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/publications']); // Navegar a la lista de publicaciones
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
