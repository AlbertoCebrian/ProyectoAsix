// frontend/src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // <-- 1. IMPORTA Observable
import { Product } from '../shared/models/product.model'; // <-- 2. IMPORTA nuestra nueva interfaz

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API_URL = 'http://localhost:3000/api/products'; // <-- 3. URL del endpoint del backend

  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }
}