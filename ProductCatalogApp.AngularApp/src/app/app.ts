import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Esto es importante, indica que es un componente standalone
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ProductCatalogApp.AngularApp';

  // Define la propiedad currentYear aquí
  protected currentYear: number;

  constructor() {
    // Asigna el año actual al inicializar el componente
    this.currentYear = new Date().getFullYear();
  }
}
