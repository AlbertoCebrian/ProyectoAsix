import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/partials/header/header.component';  // 🔹 importar el header

@Component({
  selector: 'app-root',
  standalone: true,                // 🔹 marcar como standalone
  imports: [RouterOutlet, HeaderComponent], // 🔹 incluir HeaderComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']        // 🔹 corregido
})
export class AppComponent {
  title = 'frontend';
}
