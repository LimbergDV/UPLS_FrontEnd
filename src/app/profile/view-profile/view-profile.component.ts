import { Component } from '@angular/core';
import { AccountInfoComponent } from '../account-info/account-info.component';
import { AddressService } from '../../service/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css',
})
export class ViewProfileComponent {
  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';
  flag: boolean = false;

  constructor(router: Router) {
    if (this.rol_access === 'NoAccess') {
      router.navigate(['/signIn']);
    } 

    if(this.rol_access === 'donor') {
      this.flag = true;
    }
  }

  
}
