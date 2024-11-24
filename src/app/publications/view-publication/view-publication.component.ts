import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckJWTService } from '../../service/check-jwt.service';

@Component({
  selector: 'app-view-publication',
  templateUrl: './view-publication.component.html',
  styleUrl: './view-publication.component.css',
})
export class ViewPublicationComponent implements OnInit {
  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';
  flag: boolean = false;

  constructor(private router: Router, private _check: CheckJWTService) {}

  ngOnInit(): void {
    if (this.rol_access == 'donee') {
      this._check.checkToken().subscribe({
        next: (value) => {
          console.log(value);
          this.flag = true;
        },
        error: (err) => {
          if (err.status == 403) {
            this.router.navigate(['/signIn']);
          } else {
            console.log(err);
          }
        },
      });
    }
  }
}
