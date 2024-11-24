import { Component, OnInit } from '@angular/core';
import { IPublications } from '../../models/i-publications';
import { PublicationService } from '../../service/publications.service';
import { DoneesService } from '../../service/donees.service';
import { IComments } from '../../models/icomments';
import { CommentsService } from '../../service/comments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-publications',
  templateUrl: './list-publications.component.html',
  styleUrl: './list-publications.component.css',
})
export class ListPublicationsComponent implements OnInit {
  constructor(
    private publicationService: PublicationService,
    private _donees: DoneesService,
    private commentService: CommentsService
  ) {}

  publications: IPublications[] = [];
  imagesMap: Map<string, Blob> = new Map();
  miniProfileView: any[] = [];
  photoUrls: { [id: string]: string } = {};

  comments: IComments[] = [];
  postId: string = '';

  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';
  commentContent: string = '';

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.publicationService.getAllPublications().subscribe({
      next: (data: IPublications[]) => {
        this.publications = data;

        this.publications.forEach((publication) => {
          if (publication.image) {
            this.publicationService.showImg(publication.image).subscribe({
              next: (blob) => {
                publication.image = URL.createObjectURL(blob);
              },
              error: (error) =>
                console.error(
                  `Error al cargar la imagen para la publicación ${publication.image}:`,
                  error
                ),
            });
          }
          this.searchUserData(publication);
        });
      },
      error: (error) => console.error('Error al cargar publicaciones:', error),
    });
  }

  searchUserData(publication: IPublications): void {
    if (publication.id_donee) {
      this._donees.getDoneeNT(publication.id_donee).subscribe({
        next: (response) => {
          this.loadViewMiniProfile(response, publication._id || '');
        },
        error: (err) => {
          console.log('Error loading donee data:', err);
        },
      });
    }
  }

  loadViewMiniProfile(profile: any, id_publication: string) {
    const miniProfileView = {
      publicationId: id_publication,
      name: profile.first_name + ' ' + profile.last_name,
      photo: profile.photo,
    };
    this.miniProfileView.push(miniProfileView);
    this.loadPhotosDonees(miniProfileView.photo);
  }

  loadPhotosDonees(profile: any) {
    console.log('' /*profile*/);
    this._donees.getPhotoNT(profile).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.photoUrls[profile] = url;
      },
      error: (err) => {
        console.error('Error loading photo for', profile.name, err);
      },
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
      error: (error) => console.error('Error al eliminar publicación', error),
    });
  }

  addComment(postId: string) {
    // Validar que los datos sean correctos
    if (!postId || this.commentContent == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Comentario vacío',
        text: 'Por favor, escribe algo antes de enviar tu comentario.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Verificar si el usuario tiene permisos de comentar
    if (this.rol_access === 'donor') {
      this.commentService.addComment(postId, this.commentContent).subscribe({
        next: (newComment: IComments) => {
          this.comments.push(newComment);
          Swal.fire({
            icon: 'success',
            title: 'Comentario agregado',
            text: 'Tu comentario fue agregado exitosamente.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#28a745',
          });
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un problema al agregar tu comentario. Por favor, intenta nuevamente.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Regístrate para comentar',
        text: 'Crea una cuenta para poder dejar comentarios.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#007bff',
      });
    }
  }

  flag: boolean = false;
  loadComments(postId: string): void {
    this.commentService.getCommentsByPost(postId).subscribe({
      next: (comments: IComments[]) => {
        this.comments = comments;
        this.flag = true;
        console.log('Comentarios obtenidos:', comments);
      },
      error: (error: any) => {
        console.error('Error al obtener comentarios:', error);
      },
    });
  }

  hiddenComments(): void {
    this.flag = false;
  }
}
