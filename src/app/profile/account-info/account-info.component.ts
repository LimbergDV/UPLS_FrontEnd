import { Component } from '@angular/core';
import { SequenceError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent {
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


  deleteAccount(){
    Swal.fire({
      title: "¿Estás seguro de eliminar tu cuenta?",
      text: "Esta acción no se puede deshacer, lo que hará que tu cuenta se elimine permanentemente de nuestros servidores",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#28a745",
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#dc3545",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminada",
          text: "Tu cuenta fue eliminada permanentemente",
          icon: "success"
        });
      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelado",
          text: "Tu cuenta no se eliminó",
          icon: "error"
        });
      }
    });
  }


}
