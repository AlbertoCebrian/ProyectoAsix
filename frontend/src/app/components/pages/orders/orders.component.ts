import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ¡Importante para el *ngFor!
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { Order } from '../../../shared/models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersPageComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // 1. Recuperamos el ID del usuario (usando el truco del 'any' por seguridad)
    const user: any = this.userService.currentUser;
    const userId = user._id || user.id;

    // 2. Pedimos sus pedidos
    if(userId) {
      this.orderService.getAllForUser(userId).subscribe({
        next: (orders) => {
          this.orders = orders;
        },
        error: (err) => console.error(err)
      });
    }
  }
}