import { Component, OnInit } from '@angular/core';
import { DonorsService } from '../../service/donors.service';
import { iDonor } from '../../models/i-donor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent implements OnInit {
  donor: iDonor = {
    blood_type: '',
    health_status: '',
    availability: '',
  };

  constructor(private _sevice: DonorsService) {}

  ngOnInit(): void {
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
}
