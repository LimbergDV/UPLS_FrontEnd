import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckJWTService } from '../../service/check-jwt.service';

@Component({
  selector: 'app-details-publication',
  templateUrl: './details-publication.component.html',
  styleUrl: './details-publication.component.css',
})
export class DetailsPublicationComponent implements OnInit {
  id_pubication: string = '';
  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _check: CheckJWTService
  ) {}

  ngOnInit(): void {
    this._check.checkToken().subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        if (err.status == 403) {
          this.router.navigate(['/signIn']);
        } else {
          console.log(err);
        }
      },
    });
    if (this.rol_access != 'donee') {
      this.router.navigate(['/publications']);
    }
    this.id_pubication = this.route.snapshot.paramMap.get('id')!;
  }
}
