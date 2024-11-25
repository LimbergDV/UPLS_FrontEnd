import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-publication',
  templateUrl: './details-publication.component.html',
  styleUrl: './details-publication.component.css',
})
export class DetailsPublicationComponent implements OnInit {
  id_pubication: string = '';
  rol_access: string = localStorage.getItem('rolAccess') || 'NoAccess';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    if(this.rol_access !='donee') {
      this.router.navigate(['/publications'])
    }
    this.id_pubication = this.route.snapshot.paramMap.get('id')!;
  }

}
