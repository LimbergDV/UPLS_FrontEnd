import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckJWTService } from '../../service/check-jwt.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css',
})
export class ViewProfileComponent implements OnInit {
  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';
  flag: boolean = false;

  constructor(private router: Router, private _check: CheckJWTService) {}
  ngOnInit(): void {
    this._check.checkToken().subscribe({
      next(value) {
        console.log(value.ok);
      },
      error: (err) => {
        if (err.status == 403) {
          this.router.navigate(['/signIn']);
        }
      },
    });

    if (this.rol_access === 'NoAccess') {
      this.router.navigate(['/signIn']);
    }

    if (this.rol_access === 'donor') {
      this.flag = true;
    }
  }
}
