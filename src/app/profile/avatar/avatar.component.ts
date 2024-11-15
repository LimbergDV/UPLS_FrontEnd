import { Component, OnInit } from '@angular/core';
import Cropper from 'cropperjs';
import Swal from 'sweetalert2';
import { DonorsService } from '../../service/donors.service';
import { DomSanitizer } from '@angular/platform-browser';
import { iDonor } from '../../models/i-donor';
import { DoneesService } from '../../service/donees.service';
import { iDonee } from '../../models/i-donee';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent implements OnInit {
  imagenSrc: any;
  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';

  userData: iDonor | iDonee = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
  };

  constructor(
    private _donorsService: DonorsService,
    private _doneesService: DoneesService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    if (this.rol_access == 'donor') {
      this.sessionDonor();
    }
    if (this.rol_access == 'donee') {
      this.sessionDonee();
    }
  }

  sessionDonor(): void {
    this._donorsService.getPhoto().subscribe({
      next: (imgBlob) => {
        const objectURL = URL.createObjectURL(imgBlob);
        this.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._donorsService.getDonor().subscribe({
      next: (response) => {
        this.userData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sessionDonee(): void {
    this._doneesService.getPhoto().subscribe({
      next: (imgBlob) => {
        const objectURL = URL.createObjectURL(imgBlob);
        this.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._doneesService.getDonee().subscribe({
      next: (response) => {
        this.userData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private cropper: Cropper | null = null;

  openImageEditor() {
    Swal.fire({
      title: 'Editar Imagen de Perfil',
      html: `
        <input type="file" id="uploadImage" class="swal2-input" accept="image/*">
        <div style="margin-top: 10px;">
          <img id="imagePreview" style="width: 100%; max-width: 300px; border-radius: 50%; display: none;">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        const input = document.getElementById(
          'uploadImage'
        ) as HTMLInputElement;
        input?.addEventListener('change', (event: any) =>
          this.loadImage(event)
        );
      },
      preConfirm: () => {
        return new Promise((resolve) => {
          if (this.cropper) { 
            const croppedCanvas = this.cropper.getCroppedCanvas({
              width: 200,
              height: 200,
              imageSmoothingEnabled: true,
              imageSmoothingQuality: 'high',
            });
            const croppedImage = croppedCanvas.toDataURL('image/png');
            resolve(croppedImage); // Devuelve la imagen recortada
          } else {
            resolve(null);
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const croppedImage = result.value;
        this.saveCroppedImage(croppedImage);
      }
    });
  }

  // Carga la imagen en el editor de recorte
  loadImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const imageElement = document.getElementById(
      'imagePreview'
    ) as HTMLImageElement;
    imageElement.src = imageUrl;
    imageElement.style.display = 'block';

    // Inicializar Cropper
    if (this.cropper) {
      this.cropper.destroy();
    }
    this.cropper = new Cropper(imageElement, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: true,
      scalable: false,
      movable: true,
      rotatable: false,
      cropBoxResizable: true,
      cropBoxMovable: true,
    });
  }

  // Guarda la imagen recortada
  saveCroppedImage(croppedImage: string) {
    // Aquí puedes guardar la imagen recortada
    const file = this.base64ToFile(
      croppedImage,
      `${this.userData.last_name}.png`
    );

    if (this.rol_access == 'donor') {
      // Ahora, envía el archivo al servicio
      this._donorsService.addPhoto(file).subscribe(
        (response) => {
          console.log('Imagen enviada exitosamente', response);
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Foto actualizada',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.error('Error al enviar la imagen', error);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Ocurrió un error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    }
    if (this.rol_access == 'donee') {
      this._doneesService.addPhoto(file).subscribe(
        (response) => {
          console.log('Imagen enviada exitosamente', response);
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Foto actualizada',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.error('Error al enviar la imagen', error);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Ocurrió un error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    }
  }

  base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : 'application/octet-stream'; // Proporciona un valor predeterminado

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}
