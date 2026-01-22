import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importamos HttpParams
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API_URL = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  // Ahora aceptamos un parámetro opcional 'category'
  getProducts(category?: string): Observable<Product[]> {
    let params = new HttpParams();
    
    // Si nos pasan una categoría, la añadimos a la URL
    if (category) {
      params = params.set('category', category);
    }

    // La petición final será tipo: http://localhost:3000/api/products?category=cpu
    return this.http.get<Product[]>(this.API_URL, { params });
  }
}