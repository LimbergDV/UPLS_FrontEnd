import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from '../../service/publications.service';
import { IPublications } from '../../models/i-publications';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrl: './add-publication.component.css'
})

export class AddPublicationComponent {
  id_donee= 1
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
    // Preparamos el objeto con los datos del formulario
    const newPublication: IPublications = {
      id_donee: this.id_donee, // Generar un ID temporal
      title: this.title,
      description: this.description,
      image: this.image ? this.image.name : '',
      date_limit: new Date(this.date_limit),
      blood_type: this.blood_type,
    };

    // Llamada al servicio para enviar la publicación al backend
    this.publicationService.addPublication(newPublication).subscribe({
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
