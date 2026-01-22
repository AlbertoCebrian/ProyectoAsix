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
    // Escuchamos cambios en la URL
    this.route.queryParams.subscribe(params => {
      this.categoryFilter = params['category']; // Leemos ?category=...
      
      // Llamamos al servicio pasando el filtro (o undefined si no hay)
      this.loadProducts(this.categoryFilter || undefined);
    });
  }

  // Carga los productos (con filtro o sin él)
  loadProducts(category?: string) {
    this.productService.getProducts(category).subscribe((serverProducts) => {
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