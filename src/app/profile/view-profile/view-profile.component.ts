import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckJWTService } from '../../service/check-jwt.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css',
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';
  profileDonor: string = localStorage.getItem('profileDonor') || '';
  profileDonee: string = localStorage.getItem('profileDonee') || '';
  flag: boolean = false;

  constructor(private router: Router, private _check: CheckJWTService) {}

  ngOnDestroy(): void {
    localStorage.setItem('profileDonor', '');
    localStorage.setItem('profileDonee', '');
  }

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

    if (this.rol_access === 'donor' || this.profileDonor != '') {
      this.flag = true;
    }

    if (this.profileDonee != '') {
      this.flag = false;
    }
  }
}
