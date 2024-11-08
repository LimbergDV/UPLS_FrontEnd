import { Component, OnInit } from '@angular/core';
import { DonorsService } from '../../service/donors.service';
import { iDonor } from '../../models/i-donor';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent implements OnInit{

  constructor(private __sevice: DonorsService){}

  ngOnInit(): void {
   this.__sevice.getDonor().subscribe({
    next:(response) => {
      console.log(response);
    },
    error:(error) => {
      console.log(error);
    }
   });
  }



}
