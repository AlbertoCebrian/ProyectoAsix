import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 🔹 importar RouterModule

@Component({
  selector: 'app-header',
  standalone: true,       // 🔹 necesario si es standalone
  imports: [RouterModule],// 🔹 aquí le decimos a Angular que use routerLink
 templateUrl: './header.component.html',   // 🔹 usar el archivo HTML externo
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}
