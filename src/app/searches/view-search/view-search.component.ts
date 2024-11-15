import { Component } from '@angular/core';
import { iDonorSearch } from '../../models/iDonorSearch';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrl: './view-search.component.css',
})
export class ViewSearchComponent {
  donors: iDonorSearch[] = [];

  getParams(donors: iDonorSearch[]): void {
    this.donors = donors;
    console.log(this.donors);
  }
}
