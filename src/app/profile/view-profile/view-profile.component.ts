import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css',
})
export class ViewProfileComponent implements OnInit {
  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';
  flag: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    
    if (this.rol_access === 'NoAccess') {
      this.router.navigate(['/signIn']);
    }

    if (this.rol_access === 'donor') {
      this.flag = true;
    }
  }
}
