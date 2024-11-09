import { Component, OnInit } from '@angular/core';
import { DonorsService } from '../../service/donors.service';
import { iDonor } from '../../models/i-donor';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent implements OnInit {
  donor: iDonor = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
  };

  constructor(private __sevice: DonorsService) {}

  ngOnInit(): void {
    this.__sevice.getDonor().subscribe({
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
  }
}
