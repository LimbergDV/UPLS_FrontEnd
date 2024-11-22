import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, DoCheck {
  flag: boolean = true;
  rol_access = localStorage.getItem('rolAccess');
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateFlagAndRedirect();
  }

  ngDoCheck(): void {
    const newRol = localStorage.getItem('rolAccess');
    if (newRol !== this.rol_access) {
      this.updateFlagAndRedirect();
    }
  }

  private updateFlagAndRedirect(): void {
    if (this.rol_access === 'donor') {
      this.flag = false;
    } else {
      this.flag = true;
    }

    if (this.rol_access === 'NoAccess') {
      this.router.navigate(['/signIn']);
    }
  }

  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(){
    this.menuOpen = false;
  }
}
