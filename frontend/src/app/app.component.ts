// frontend/src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/partials/header/header.component';
// FIX: Ruta corregida para seguir la estructura de 'partials'
import { CategoryMenuComponent } from './components/partials/category-menu/category-menu.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // El array 'imports' está ahora correcto
  imports: [RouterOutlet, HeaderComponent, CategoryMenuComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}