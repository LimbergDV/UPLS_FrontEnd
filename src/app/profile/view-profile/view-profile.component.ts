import { Component } from '@angular/core';
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
