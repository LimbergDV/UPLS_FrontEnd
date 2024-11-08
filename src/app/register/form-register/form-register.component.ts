import { Component } from '@angular/core';
import { DoneesService } from '../../service/donees.service';
import { DonorsService } from '../../service/donors.service';
import Swal from 'sweetalert2';
import { iDonee } from '../../models/i-donee';
import { iDonor } from '../../models/i-donor';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {
  constructor(
    private _doneesService: DoneesService,
    private _donorsService: DonorsService
  ) {}

  flag: boolean = true; 

  userData: iDonee | iDonor = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    bloodType: undefined
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
      phone_number: this.userData.phone_number
    };

    this._doneesService.register(newDonee).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Te has registrado como Donatario correctamente.',
          icon: 'success'
        });
      },
      error: (err) => {
        console.log(err);
        if (err.status === 400) {
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema con los datos de registro.',
            icon: 'error'
          });
        } else {
          
          Swal.fire({
            title: '¡Opss...!',
            text: 'Hubo un error inesperado, intenta de nuevo más tarde.',
            icon: 'warning'
          });
        }
      }
    });
  }

  // Registrar Donante
  registerDonor(): void {
    const newDonor: iDonor = {
      email: this.userData.email,
      password: this.userData.password,
      first_name: this.userData.first_name,
      last_name: this.userData.last_name,
      phone_number: this.userData.phone_number,
      bloodType: this.userData.bloodType
    };

    this._donorsService.register(newDonor).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Te has registrado como Donante correctamente.',
          icon: 'success'
        });
      },
      error: (err) => {
        if (err.status === 400) {
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema con los datos de registro.',
            icon: 'error'
          });
        } else {
          Swal.fire({
            title: '¡Opss...!',
            text: 'Hubo un error inesperado, intenta de nuevo más tarde.',
            icon: 'warning'
          });
        }
      }
    });
  }

  // Función principal de registro, dependiendo de la elección
  signUp(): void {
    if (this.flag) {
      this.registerDonee();  // Registrar como Donatario
    } else {
      this.registerDonor();  // Registrar como Donante
    }
  }
}
