import { Component } from '@angular/core';
import { DoneesService } from '../../service/donees.service';
import { DonorsService } from '../../service/donors.service';
import Swal from 'sweetalert2';
import { iDonee } from '../../models/i-donee';
import { iDonor } from '../../models/i-donor';
import { iProfile } from '../../models/i-profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  constructor(
    private _doneesService: DoneesService,
    private _donorsService: DonorsService,
    private router: Router
  ) {}

  flag: boolean = true;

  userData: iDonee | iDonor = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    blood_type: 'O+',
  };

  toggleDonorDonee(event: Event): void {
    event.preventDefault();
    this.flag = !this.flag;
  }

  // Registrar Donatario
  registerDonee(): void {
    const newDonee: iDonee = {
      email: this.userData.email,
      password: this.userData.password,
      first_name: this.userData.first_name,
      last_name: this.userData.last_name,
      phone_number: this.userData.phone_number,
    };

    this._doneesService.register(newDonee).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Te has registrado como Donatario correctamente.',
          icon: 'success',
        });
        console.log(response);
        this.router.navigate(['/signIn']);
      },
      error: (err) => {
        console.log(err);
        if (err.status === 400) {
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema con los datos de registro.',
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: '¡Opss...!',
            text: 'Hubo un error inesperado, intenta de nuevo más tarde.',
            icon: 'warning',
          });
        }
      },
    });
  }

  // Registrar Donante
  registerDonor(): void {
    let id_donor: number = 0;
    const newDonor: iDonor = {
      email: this.userData.email,
      password: this.userData.password,
      first_name: this.userData.first_name,
      last_name: this.userData.last_name,
      phone_number: this.userData.phone_number,
    };

    this._donorsService.register(newDonor).subscribe({
      next: (response) => {
        id_donor = response.id_donor;
        const newProfile: iProfile = {
          id_donor: id_donor,
          bloodType: this.userData.blood_type || '',
        };

        this._donorsService.registerProfile(newProfile).subscribe({
          next: (response) => {
            console.log(response);
            Swal.fire({
              title: '¡Registro Exitoso!',
              text: 'Te has registrado como Donante correctamente.',
              icon: 'success',
            });
            this.router.navigate(['/signIn']);
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              title: '¡Opss...!',
              text: 'Hubo un error inesperado, intenta de nuevo más tarde.',
              icon: 'warning',
            });
          },
        });
      },
      error: (err) => {
        if (err.status === 400) {
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema con los datos de registro.',
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: '¡Opss...!',
            text: 'Hubo un error inesperado, intenta de nuevo más tarde.',
            icon: 'warning',
          });
        }
      },
    });
  }

  // Función principal de registro, dependiendo de la elección
  signUp(): void {
    if (this.flag) {
      this.registerDonee(); // Registrar como Donatario
    } else {
      this.registerDonor(); // Registrar como Donante
    }
  }
}
