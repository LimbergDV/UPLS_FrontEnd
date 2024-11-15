import { Component, OnInit } from '@angular/core';
import { iDonorSearch } from '../../models/iDonorSearch';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrl: './view-search.component.css',
})
export class ViewSearchComponent implements OnInit {
  donors: iDonorSearch[] = [];
  notFoud: boolean = false;
  initImage: boolean = false;

  ngOnInit(): void {
    this.initImage = true;
  }

  getParams(donors: iDonorSearch[]): void {
    this.donors = donors;
    this.notFoud = false;
    this.initImage = false;
  }

  notFoudDonors(flag: boolean): void {
    this.notFoud = flag;
    this.initImage = false;
  }
}
