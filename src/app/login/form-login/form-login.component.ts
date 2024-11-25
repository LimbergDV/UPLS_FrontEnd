import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { iAccess } from '../../models/iAccess';
import { DoneesService } from '../../service/donees.service';
import { DonorsService } from '../../service/donors.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent implements OnInit {
  constructor(
    private _doneesService: DoneesService,
    private _donorsService: DonorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('rolAccess', '');
  }

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
          this.router.navigate(['/publications']);
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
          this.router.navigate(['/publications']);
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
