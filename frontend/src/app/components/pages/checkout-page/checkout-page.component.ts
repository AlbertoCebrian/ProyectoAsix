import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { Order } from '../../../shared/models/order.model';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {
  
  checkoutForm!: FormGroup;
  order: Order = new Order();
  isSubmitting = false; // Para mostrar efecto de carga

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Obtener el carrito actual
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;

    // 2. Obtener usuario (para rellenar datos automáticamente)
    const user = this.userService.currentUser;
    const name = user.name;
    const address = user.address || '';

    // 3. Crear el formulario
    this.checkoutForm = this.formBuilder.group({
  name: [name, Validators.required],       // Usamos la variable 'name'
  address: [address, Validators.required]  // Usamos la variable 'address'
});
  }

  get fc() {
    return this.checkoutForm.controls;
  }

 createOrder() {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.isSubmitting = true; // Empieza la "carga"

    // Rellenamos el objeto Order con los datos del formulario
    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;
    
    // --- AQUÍ ESTÁ EL ARREGLO ---
    // Convertimos a 'any' para poder leer '_id' si 'id' no existe
    const user: any = this.userService.currentUser;
    this.order.user = user._id || user.id; 
    // ----------------------------

    // Debug: Esto saldrá en la consola del navegador (F12) para confirmar que ya tenemos ID
    console.log("Enviando pedido con Usuario ID:", this.order.user);

    // Simulamos una espera de 1.5 segundos
    setTimeout(() => {
        this.orderService.create(this.order).subscribe({
          next: () => {
            // alert('¡Pedido realizado con éxito!'); // Opcional, mejor redirigir directo
            this.cartService.clearCart(); // Vaciamos el carrito
            this.router.navigateByUrl('/orders'); // Vamos a la página de pedidos
            this.isSubmitting = false;
          },
          error: (err) => {
            console.error(err); // Para ver el error completo en consola
            alert('Error al crear el pedido: ' + err.message);
            this.isSubmitting = false;
          }
        });
    }, 1500); 
  }
}