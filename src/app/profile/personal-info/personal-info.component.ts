import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AddressService } from '../../service/address.service';
import { iAddress } from '../../models/iAddress';
import { iDonee } from '../../models/i-donee';
import { iDonor } from '../../models/i-donor';
import { DonorsService } from '../../service/donors.service';
import { Router } from '@angular/router';
import { iAccess } from '../../models/iAccess';
import { DoneesService } from '../../service/donees.service';
import { ChatService } from '../../service/chat.service';
import { PublicationService } from '../../service/publications.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent implements OnInit {
  profileDonor: string = localStorage.getItem('profileDonor') || '';
  profileDonee: string = localStorage.getItem('profileDonee') || '';
  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';

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
    private _doneesService: DoneesService,
    private router: Router,
    private _chatService: ChatService,
    private _publication: PublicationService
  ) {}

  ngOnInit(): void {
    if (this.profileDonee != '') {
      this.getDoneeNT();
    } else if (this.profileDonor != '') {
      this.getDonorNT();
    } else {
      if (this.rol_access == 'donor') {
        this.getDonor();
      }
      if (this.rol_access == 'donee') {
        this.getDonee();
      }
    }
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

  getDonorNT(): void {
    this._donorsService.getDonorById(this.profileDonor).subscribe({
      next: (respose) => {
        this.userData = respose;
        this.address.postal_code = this.userData.address?.postal_code || '';
        this.address.state = this.userData.address?.state || '';
        this.address.locality = this.userData.address?.locality || '';
        this.address.distrits.push(this.userData.address?.distrit || '');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDonee(): void {
    this._doneesService.getDonee().subscribe({
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

  getDoneeNT(): void {
    this._doneesService.getDoneeById(this.profileDonee).subscribe({
      next: (respose) => {
        this.userData = respose;
        this.address.postal_code = this.userData.address?.postal_code || '';
        this.address.state = this.userData.address?.state || '';
        this.address.locality = this.userData.address?.locality || '';
        this.address.distrits.push(this.userData.address?.distrit || '');
      },
      error: (err) => {
        console.log(err);
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

    if (this.rol_access == 'donor') {
      this._donorsService.updatePersonalPSW(newAccess).subscribe({
        next: (response) => {
          Swal.fire('¡Éxito!', 'Tu contraseña ha sido actualizada.', 'success');
          console.log(response);
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Opss...!', 'Ocurrió un error.', 'error');
        },
      });
    }
    if (this.rol_access == 'donee') {
      this._doneesService.updatePersonalPSW(newAccess).subscribe({
        next: (response) => {
          Swal.fire('¡Éxito!', 'Tu contraseña ha sido actualizada.', 'success');
          console.log(response);
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Opss...!', 'Ocurrió un error.', 'error');
        },
      });
    }
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

    if (this.rol_access == 'donor') {
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
    if (this.rol_access == 'donee') {
      this._doneesService.updatePersonalInfo(newData).subscribe({
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

  deleteAccount(): void {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar tu cuenta?',
      text: 'Todos los datos se borrarán y tendrás que empezar de nuevo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar cuenta!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._doneesService.deleteAccount().subscribe({
          next: (response) => {
            console.log(response);
            this._chatService.deleteConversation('Donee').subscribe({
              next: (response) => {
                console.log(response);
                this._publication.deleteAllByDonee().subscribe({
                  next: () => {
                    Swal.fire({
                      title: 'Eliminado!',
                      text: 'Gracias por ser parte del movimeinto.',
                      icon: 'success',
                    });
                    this.router.navigate(['/signUp']);
                  },
                  error: (err) => {
                    console.log(err);
                  },
                });
              },
            });
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              title: 'Ocurrió un error!',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
