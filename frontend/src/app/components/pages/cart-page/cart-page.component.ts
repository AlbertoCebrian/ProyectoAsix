import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/products.service'; // <--- Importamos esto
import { Cart } from '../../../shared/models/cart.model';
import { CartItem } from '../../../shared/models/cartItem.model';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  suggestedProducts: Product[] = []; // <--- Lista para sugerencias

  constructor(
    private cartService: CartService,
    private productService: ProductService // <--- Inyectamos el servicio
  ) {}

  ngOnInit(): void {
    // 1. Suscribirse al carrito
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });

    // 2. Cargar sugerencias (Traemos todos y cogemos 4 al azar o los primeros 4)
    this.productService.getProducts().subscribe((products) => {
      // Cogemos los 4 primeros que NO estén ya en el carrito (filtro opcional)
      this.suggestedProducts = products.slice(0, 4); 
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.product._id);
  }

  // Nueva lógica para botones + y -
  changeQuantity(cartItem: CartItem, quantity: number) {
    const newQuantity = quantity;
    // Evitamos que baje de 1 o suba exageradamente (opcional: limitar a stock)
    if (newQuantity < 1) return; 
    if (newQuantity > 10) return; // Límite arbitrario de 10 por seguridad

    this.cartService.changeQuantity(cartItem.product._id, newQuantity);
  }
}