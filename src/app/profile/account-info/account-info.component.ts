import { Component, OnInit } from '@angular/core';
import { DonorsService } from '../../service/donors.service';
import { iDonor } from '../../models/i-donor';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ChatService } from '../../service/chat.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent implements OnInit {
  profileDonor: string = localStorage.getItem('profileDonor') || '';
  donor: iDonor = {
    blood_type: '',
    health_status: '',
    availability: '',
  };

  constructor(
    private _sevice: DonorsService,
    private router: Router,
    private _chatService: ChatService
  ) {}

  ngOnInit(): void {
    if (this.profileDonor != '') {
      this._sevice.getDonorById(this.profileDonor).subscribe({
        next: (response) => {
          this.donor = response;
          console.log(this.donor);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this._sevice.getDonor().subscribe({
        next: (response) => {
          this.donor = response;
          console.log(this.donor);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  idDisabled: boolean = true;
  editAccountInfo() {
    this.idDisabled = false;
  }

  saveInfo() {
    const newData: iDonor = {
      health_status: this.donor.health_status,
      blood_type: this.donor.blood_type,
      availability: this.donor.availability,
    };
    console.log(newData);
    this._sevice.updateAccountInfo(newData).subscribe({
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
        this._sevice.deleteAccount().subscribe({
          next: (response) => {
            console.log(response);

            this._chatService.deleteConversation('Donor').subscribe({
              next: (response) => {
                console.log(response);
                Swal.fire({
                  title: 'Eliminado!',
                  text: 'Gracias por ser parte del movimeinto.',
                  icon: 'success',
                });
                this.router.navigate(['/signUp']);
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
