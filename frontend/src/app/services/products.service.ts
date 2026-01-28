import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URLs de tu Backend
  private readonly API_URL = '/api/products';
  private readonly REVIEWS_URL = '/api/reviews'; 

  constructor(private http: HttpClient) { }

  // 1. OBTENER PRODUCTOS (Con Filtro de Categoría Y Buscador)
  getProducts(category?: string, searchTerm?: string): Observable<Product[]> {
    let params = new HttpParams();
    
    // Si hay categoría, la añadimos a la URL
    if (category) {
      params = params.set('category', category);
    }
    
    // Si hay término de búsqueda, lo añadimos a la URL
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<Product[]>(this.API_URL, { params });
  }

  // 2. OBTENER UN SOLO PRODUCTO (Por ID)
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${productId}`);
  }

  // 3. OBTENER RESEÑAS (Esto es lo que te faltaba y daba error)
  getReviews(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.REVIEWS_URL}/${productId}`);
  }

  // 4. PUBLICAR RESEÑA (Esto también te faltaba)
  addReview(reviewData: any): Observable<any> {
    return this.http.post<any>(this.REVIEWS_URL, reviewData);
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }

  updateProduct(product: Product): Observable<Product> {
    // CORRECCIÓN: Cambiamos 'product.id' por 'product._id'
    return this.http.put<Product>(`${this.API_URL}/${product._id}`, product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${productId}`);
  }
}