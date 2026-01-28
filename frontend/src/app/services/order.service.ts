import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // URL de tu Backend
  private ORDER_URL = 'api/orders/create';

  constructor(private http: HttpClient) { }

  // Función para enviar el pedido
  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ORDER_URL, order);
    
  }
  getAllForUser(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`api/orders/user/${userId}`);
  }
}