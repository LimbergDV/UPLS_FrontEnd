import { Component } from '@angular/core';

@Component({
  selector: 'view-map',
  templateUrl: './view-map.component.html',
  styleUrl: './view-map.component.css',
})
export class ViewMapComponent {
  id_bank: number = 0;
  flag: boolean = false

  setId(id: number): void {
    this.id_bank = id;
    this.flag = true
  }

}
