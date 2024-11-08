import { Component } from '@angular/core';
import Cropper from 'cropperjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {


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
        const input = document.getElementById('uploadImage') as HTMLInputElement;
        input?.addEventListener('change', (event: any) => this.loadImage(event));
      },
      preConfirm: () => {
        return new Promise((resolve) => {
          if (this.cropper) {
            const croppedCanvas = this.cropper.getCroppedCanvas({
              width: 200,
              height: 200,
              imageSmoothingEnabled: true,
              imageSmoothingQuality: 'high'
            });
            const croppedImage = croppedCanvas.toDataURL('image/png');
            resolve(croppedImage); // Devuelve la imagen recortada
          } else {
            resolve(null);
          }
        });
      }
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
    const imageElement = document.getElementById('imagePreview') as HTMLImageElement;
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
      cropBoxMovable: true
    });
  }

  // Guarda la imagen recortada
  saveCroppedImage(croppedImage: string) {
    // Aquí puedes guardar la imagen recortada
    console.log('Imagen recortada:', croppedImage);
  }

}
