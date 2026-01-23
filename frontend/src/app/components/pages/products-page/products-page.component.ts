import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router'; // Importamos ActivatedRoute
import { ProductService } from '../../../services/products.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  // 1. Variables para la lista y filtros
  products: Product[] = [];
  categoryFilter: string | null = null;

  // 2. Variables para el Modal (¡Las habíamos borrado!)
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute // Necesario para leer la URL (?category=cpu)
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryFilter = params['category'];
      const searchTerm = params['searchTerm']; // <--- Leemos la búsqueda
      
      this.loadProducts(this.categoryFilter || undefined, searchTerm);
    });
  }

  // Actualizamos para recibir los dos filtros
// En products-page.component.ts

  loadProducts(category?: string, searchTerm?: string) {
    // TypeScript a veces se queja si pasas null, así que aseguramos undefined
    const cat = category || undefined;
    const search = searchTerm || undefined;

    this.productService.getProducts(cat, search).subscribe((serverProducts) => {
      this.products = serverProducts;
    });
  }

  // --- Lógica del Modal (Restaurada) ---
  
  openProduct(product: Product) {
    this.selectedProduct = product;
  }

  closeModal() {
    this.selectedProduct = null;
  }
}