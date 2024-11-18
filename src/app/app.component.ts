import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UPLS_FrontEnd';

  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escucha los cambios de la ruta
    this.router.events.subscribe(() => {
      // Obtén la ruta actual
      const currentRoute = this.router.url;
      // Define las rutas en las que no quieres mostrar el navbar
      const routesWithoutNavbar = ['/signIn', '/signUp', '/principal'];

      // Cambia la visibilidad del navbar según la ruta
      this.showNavbar = !routesWithoutNavbar.includes(currentRoute);
    });
  }
}
