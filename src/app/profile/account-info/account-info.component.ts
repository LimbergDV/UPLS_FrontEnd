import { Component } from '@angular/core';
import Cropper from 'cropperjs';
import { SequenceError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent {
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
