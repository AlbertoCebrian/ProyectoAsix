import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart.model';
import { CartItem } from '../shared/models/cartItem.model';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  // 1. Añadir al carrito
  addToCart(product: Product): void {
    // FIX: Añadimos (item: CartItem) para que sepa qué es 'item'
    let cartItem = this.cart.items.find((item: CartItem) => item.product._id === product._id);
    if (cartItem) {
      return; 
    }

    this.cart.items.push(new CartItem(product));
    this.setCartToLocalStorage();
  }

  // 2. Quitar del carrito
  removeFromCart(productId: string): void {
    // FIX: Añadimos (item: CartItem)
    this.cart.items = this.cart.items.filter((item: CartItem) => item.product._id !== productId);
    this.setCartToLocalStorage();
  }

  // 3. Cambiar cantidad
  changeQuantity(productId: string, quantity: number): void {
    // FIX: Añadimos (item: CartItem)
    let cartItem = this.cart.items.find((item: CartItem) => item.product._id === productId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.product.price;
    this.setCartToLocalStorage();
  }

  // 4. Limpiar carrito
  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  // 5. Obtener el carrito
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // --- MÉTODOS PRIVADOS ---

  private setCartToLocalStorage(): void {
    // FIX: Tipos explícitos también aquí
    this.cart.totalPrice = this.cart.items.reduce((prevSum: number, currentItem: CartItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum: number, currentItem: CartItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

  getCart(): Cart {
  return this.cartSubject.value;
}
}