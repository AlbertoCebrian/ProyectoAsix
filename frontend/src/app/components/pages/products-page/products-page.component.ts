// frontend/src/app/components/pages/products-page/products-page.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

// --- ¡¡AQUÍ ESTÁ LA CORRECCIÓN!! ---
// El FICHERO es 'products.service' (plural), pero la CLASE es 'ProductService' (singular)
import { ProductService } from '../../../services/products.service'; // <-- Así SÍ.
import { Product } from '../../../shared/models/product.model'; 

@Component({
  selector: 'app-products-page',
  standalone: true, 
  imports: [
    CommonModule, 
    RouterModule  
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit { 

  products: Product[] = [];
  
  // --- Lógica del Bloque 2 AÑADIDA ---
  selectedProduct: Product | null = null; 
  // ----------------------------------

  // --- ¡¡AQUÍ ESTÁ LA CORRECCIÓN!! ---
  // Usamos la CLASE 'ProductService' (singular)
  constructor(private productService: ProductService) { } 

  ngOnInit(): void {
    // Esta línea ahora SÍ funcionará porque 'productService' está bien inyectado
    this.productService.getProducts().subscribe(serverProducts => { 
      this.products = serverProducts;
      // console.log(this.products); // (Dejamos tu console.log, está perfecto)
    });
  }

  // --- Lógica del Bloque 2 AÑADIDA ---
  openProduct(product: Product) {
    this.selectedProduct = product;
  }

  closeModal() {
    this.selectedProduct = null;
  }
  // ----------------------------------
}