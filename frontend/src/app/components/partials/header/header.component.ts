import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importamos Router
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private router: Router) {}

  // Función que se ejecuta al darle a la lupa o Enter
  search(term: string): void {
    if (term) {
      this.router.navigate(['/products'], { queryParams: { searchTerm: term } });
    } else {
      // Si borran el texto, volvemos a ver todos los productos
      this.router.navigate(['/products']);
    }
  }
}

