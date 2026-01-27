import { Component, OnInit } from '@angular/core'; // <--- Añadido OnInit
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Importamos los servicios y el modelo
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
// AÑADIMOS 'implements OnInit' PARA QUE ANGULAR ARRANQUE LA LÓGICA AL INICIO
export class HeaderComponent implements OnInit {
  
  cartQuantity = 0; // Variable para el número rojo
  user!: User;      // Variable para saber quién está logueado

  constructor(
    private router: Router,
    private cartService: CartService, // <--- Inyectamos Carrito
    private userService: UserService  // <--- Inyectamos Usuario
  ) {}

  ngOnInit(): void {
    // 1. Escuchar al Carrito
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    // 2. Escuchar al Usuario (Login/Logout)
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  // Función para cerrar sesión
  logout() {
    this.userService.logout();
  }

  // Tu función de búsqueda (INTACTA)
  search(term: string): void {
    if (term) {
      this.router.navigate(['/products'], { queryParams: { searchTerm: term } });
    } else {
      this.router.navigate(['/products']);
    }
  }
}