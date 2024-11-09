import { Component } from '@angular/core';
import { iAccess } from '../../models/iAccess';
import { DoneesService } from '../../service/donees.service';
import { DonorsService } from '../../service/donors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent {
  constructor(
    private _doneesService: DoneesService,
    private _donorsService: DonorsService
  ) {}

  flag: boolean = true; //Entrada por defecto como donatario (donee)

  credentials: iAccess = {
    email: '',
    password: '',
  };

  isDonor(): void {
    this.flag = false;
  }

  isDonee(): void {
    this.flag = true;
  }

  signIn(): void {
    const credentials: iAccess = {
      email: this.credentials.email,
      password: this.credentials.password,
    };

    if (this.flag) {
      //Iniciar la sesión como donatario
      this._doneesService.login(credentials).subscribe({
        next: (response) => {
          const token = response.access_token;
          localStorage.setItem('token', token);
          localStorage.setItem('rolAccess', 'donee');
        },
        error: (err) => {
          if (err.status == 404) {
            Swal.fire({
              title: '¡Opss...!',
              text: 'No se encontró la cuenta',
              icon: 'info',
            });
          }
          if (err.status == 401) {
            Swal.fire({
              title: '¡Opss...!',
              text: 'Las credenciales no coinciden',
              icon: 'error',
            });
          }
        },
      });
    } else {
      //Iniciar la sesión como donador
      this._donorsService.login(credentials).subscribe({
        next: (response) => {
          const token = response.access_token;
          localStorage.setItem('token', token);
          localStorage.setItem('rolAccess', 'donor');
        },
        error: (err) => {
          if (err.status == 404) {
            Swal.fire({
              title: '¡Opss...!',
              text: 'No se encontró la cuenta',
              icon: 'info',
            });
          }
          if (err.status == 401) {
            Swal.fire({
              title: '¡Opss...!',
              text: 'Las credenciales no coinciden',
              icon: 'error',
            });
          }
        },
      });
    }
  }
}
