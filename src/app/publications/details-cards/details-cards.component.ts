import { Component, Input, OnInit } from '@angular/core';
import { IPublications } from '../../models/i-publications';
import { PublicationService } from '../../service/publications.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IComments } from '../../models/icomments';
import { CommentsService } from '../../service/comments.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { DonorsService } from '../../service/donors.service';

@Component({
  selector: 'app-detailsCards',
  templateUrl: './details-cards.component.html',
  styleUrl: './details-cards.component.css',
})
export class DetailsCardsComponent implements OnInit {
  @Input() id_publication: string = '';
  imageSRC: any;
  comments: IComments[] = [];
  image: File | null = null; // almacenar la imagen
  imagePreview: any;
  flag: boolean = false;
  photoUrls: { [id: string]: string } = {};

  publication: IPublications = {
    title: '',
    description: '',
    image: '',
    blood_type: '',
    comments: [],
  };

  donorProfiles: Array<{
    publicationId: string;
    commentId: string;
    name: string;
    photo: string;
    id_donor: number;
  }> = [];

  constructor(
    private _publications: PublicationService,
    private sanitizer: DomSanitizer,
    private commentService: CommentsService,
    private router: Router,
    private _donors: DonorsService
  ) {}

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(): void {
    this._publications.getPublicationById(this.id_publication).subscribe({
      next: (response) => {
        this.publication = response;
        this.loadImage();
        this.loadComments();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadImage(): void {
    this._publications.showImg(this.publication.image).subscribe({
      next: (imageBlob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadComments(): void {
    this.commentService.getCommentsByPost(this.id_publication).subscribe({
      next: (comments: IComments[]) => {
        this.comments = comments;
        console.log('Comentarios obtenidos:', comments);
        this.searchUserDonors(this.comments);
        this.flag = true;
      },
      error: (error: any) => {
        console.error('Error al obtener comentarios:', error);
      },
    });
  }

  searchUserDonors(comments: IComments[]): void {
    // Lógica para manejar los comentarios de donors
    comments.forEach((comment) => {
      if (comment.id_donor) {
        // Verificar si el donor ya está cargado para evitar duplicados
        const isDonorLoaded = this.donorProfiles.some(
          (profile) =>
            profile.commentId === comment._id &&
            profile.publicationId === this.publication._id
        );

        if (!isDonorLoaded) {
          console.log(comment);

          this._donors.getDonorNT(comment.id_donor).subscribe({
            next: (response) => {
              this.loadDonorProfile(
                response,
                this.publication._id || '',
                comment._id || ''
              );
            },
            error: (err) => {
              console.log('Error loading donor data for comment:', err);
            },
          });
        }
      }
    });
  }

  loadDonorProfile(
    profile: any,
    id_publication: string,
    commentId: string
  ): void {
    const donorProfile = {
      id_donor: profile.id_donor,
      publicationId: id_publication,
      commentId: commentId,
      name: `${profile.first_name} ${profile.last_name}`,
      photo: profile.photo,
    };
    console.log(donorProfile);

    this.donorProfiles.push(donorProfile);
    this.loadPhotosDonors(donorProfile.photo);
  }

  loadPhotosDonors(photo: any): void {
    console.log('Cargando foto de donor');
    this._donors.getPhotoNT(photo).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.photoUrls[photo] = url;
      },
      error: (err) => {
        console.error('Error loading photo for donor:', err);
      },
    });
  }

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

  convertBase64ToFile(base64: string, fileName: string): File {
    const base64Parts = base64.split(',');
    const contentType = base64Parts[0].match(/:(.*?);/)?.[1];
    const byteCharacters = atob(base64Parts[1]);
    const byteNumbers = Array.from(byteCharacters, (char) =>
      char.charCodeAt(0)
    );
    const byteArray = new Uint8Array(byteNumbers);

    return new File([byteArray], fileName, {
      type: contentType || 'application/octet-stream',
    });
  }

  // Método para agregar una publicación
  onSubmit(): void {
    if (!this.publication.title.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'El título es obligatorio.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (!this.publication.description.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'La descripción es obligatoria.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (!this.publication.date_limit) {
      Swal.fire({
        title: 'Error',
        text: 'La fecha limite es obligatoria.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(this.publication.date_limit);

    if (selectedDate <= currentDate) {
      Swal.fire({
        title: 'Error',
        text: 'La fecha debe de ser mayor a la fecha actual',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (!this.publication.blood_type) {
      Swal.fire({
        title: 'Error',
        text: 'El tipo de sangre es obligatorio.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (this.publication.donors_number! <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'El número de donantes debe ser mayor que cero.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Crear el objeto base sin la imagen
    const newPublicationBase = {
      title: this.publication.title,
      description: this.publication.description,
      date_limit: new Date(this.publication.date_limit),
      blood_type: this.publication.blood_type,
      donors_number: this.publication.donors_number,
    };

    // Subir la imagen primero y luego completar el objeto
    const file = this.convertBase64ToFile(this.imagePreview, 'name');
    this._publications
      .addImg(file)
      .pipe(
        switchMap((response: { fileId: string }) => {
          console.log('ID de imagen recibido:', response.fileId);

          // Crear el objeto completo con la imagen
          const newPublication: IPublications = {
            ...newPublicationBase,
            image: response.fileId,
            comments: [], // Añadir la imagen (ID)
          };

          // Retornar el observable para agregar la publicación
          return this._publications.updatePublication(
            this.id_publication,
            newPublication
          );
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Publicación actualizada:', response);

          Swal.fire({
            title: '¡Éxito!',
            text: 'Tu publicación ha sido realizada con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.router.navigate(['/publications']);
        },
        error: (error) => {
          console.error('Error al actualizar publicación:', error);

          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar la publicación. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
  }

  cancel(): void {
    this.router.navigate(['publications']);
  }

  isDisabled: boolean = true;

  editData(): void {
    this.isDisabled = false;
  }

  delete(): void {
    this._publications.deletePublication(this.id_publication).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          title: 'Muy bien',
          text: 'Se eliminó la publicacación.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.router.navigate(['/publications']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  hiddenComments(): void {
    this.flag = false;
  }

  seeProfile(id: number): void {
    localStorage.setItem('profileDonor', id.toString());
    this.router.navigate(['/profile']);
  }
}
