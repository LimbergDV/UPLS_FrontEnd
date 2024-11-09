import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AddressService } from '../../service/address.service';
import { iAddress } from '../../models/iAddress';
import { iDonee } from '../../models/i-donee';
import { iDonor } from '../../models/i-donor';
import { DonorsService } from '../../service/donors.service';
import { Router } from '@angular/router';
import { iAccess } from '../../models/iAccess';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent {
  address: iAddress = {
    state: '',
    locality: '',
    postal_code: '',
    distrits: [''],
  };

  userData: iDonee | iDonor = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    blood_type: 'O+',
    address: {
      state: '',
      locality: '',
      postal_code: '',
      distrit: '',
    },
  };

  constructor(
    private _addressService: AddressService,
    private _donorsService: DonorsService,
    private router: Router
  ) {
    this.getDonor();
  }

  getDonor(): void {
    this._donorsService.getDonor().subscribe({
      next: (respose) => {
        this.userData = respose;
        this.address.postal_code = this.userData.address?.postal_code || '';
        this.address.state = this.userData.address?.state || '';
        this.address.locality = this.userData.address?.locality || '';
        this.address.distrits.push(this.userData.address?.distrit || '');
      },
      error: (err) => {
        console.log(err);
        if (err.status == 401) {
          this.router.navigate(['/signIn']);
        }
      },
    });
  }

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
        const newPassword = (
          document.getElementById('newPassword') as HTMLInputElement
        ).value;
        const confirmPassword = (
          document.getElementById('confirmPassword') as HTMLInputElement
        ).value;

        if (!newPassword || !confirmPassword) {
          Swal.showValidationMessage('Por favor ingresa ambas contraseñas');
          return false;
        }
        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage('Las contraseñas no coinciden');
          return false;
        }
        return newPassword;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newPassword = result.value;

        this.updatePassword(newPassword);
      }
    });
  }

  updatePassword(newPassword: string) {
    const newAccess = {
      credentials: {
        email: this.userData.email,
        password: newPassword,
      },
    };
    this._donorsService.updatePersonalPSW(newAccess).subscribe({
      next: (response) => {
        Swal.fire('¡Éxito!', 'Tu contraseña ha sido actualizada.', 'success');
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchAddress(): void {
    const postalCode = this.address.postal_code;
    this._addressService.getAddress(postalCode).subscribe({
      next: (response) => {
        this.address = response;
        console.log(this.address);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  idDisabled: boolean = true;
  editPersonalInfo() {
    this.idDisabled = false;
  }

  saveInfo() {
    const newData: iDonor = {
      first_name: this.userData.first_name,
      last_name: this.userData.last_name,
      email: this.userData.email,
      phone_number: this.userData.phone_number,
      address: {
        state: this.address.state,
        locality: this.address.locality,
        postal_code: this.address.postal_code,
        distrit: this.address.distrits[1],
      },
    };
    this._donorsService.updatePersonalInfo(newData).subscribe({
      next: (response) => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Datos Actualizados',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.idDisabled = true;
  }
}
