import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {
  editPassword() {
    Swal.fire({
      title: 'Editar Contraseña',
      html: `
        <input type="password" id="newPassword" class="swal2-input" placeholder="Nueva Contraseña">
        <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirmar Contraseña">
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

        if (!newPassword || !confirmPassword) {
          Swal.showValidationMessage('Por favor ingresa ambas contraseñas');
          return false;
        }
        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage('Las contraseñas no coinciden');
          return false;
        }

        return newPassword;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newPassword = result.value;

        this.updatePassword(newPassword);

        Swal.fire('¡Éxito!', 'Tu contraseña ha sido actualizada.', 'success');
      }
    });
  }

  updatePassword(newPassword: string) {
    console.log('Nueva contraseña:', newPassword);

  }

}
