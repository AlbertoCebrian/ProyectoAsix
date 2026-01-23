import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Añadido Router
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../../../services/products.service';
import { Product } from '../../../shared/models/product.model';
import { CartService } from '../../../services/cart.service'; // <--- IMPORTANTE: Importar CartService

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  
  product!: Product;
  currentImage: string = '';
  
  // Variables para las reseñas
  reviews: any[] = [];
  newReview = { userName: '', comment: '', rating: 5 };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService, // <--- INYECTAMOS EL SERVICIO DEL CARRITO
    private router: Router            // <--- INYECTAMOS EL ROUTER (para redirigir)
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        const id = params['id'];
        
        // 1. Cargar Producto
        this.productService.getProductById(id).subscribe(serverProduct => {
          this.product = serverProduct;
          // Poner imagen por defecto si existe
          this.currentImage = (this.product.images && this.product.images.length > 0) 
            ? this.product.images[0] 
            : 'assets/images/default-product.png';
        });

        // 2. Cargar Reseñas
        this.loadReviews(id);
      }
    });
  }

  // --- LÓGICA DE RESEÑAS ---
  loadReviews(productId: string) {
    this.productService.getReviews(productId).subscribe(data => {
      this.reviews = data;
    });
  }

  submitReview() {
    if (!this.newReview.userName || !this.newReview.comment) return;

    const reviewPayload = {
      ...this.newReview,
      productId: this.product._id
    };

    this.productService.addReview(reviewPayload).subscribe(response => {
      this.newReview = { userName: '', comment: '', rating: 5 };
      this.loadReviews(this.product._id); 
    });
  }
  
  get averageRating(): number {
    if (!this.reviews.length) return 0;
    const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / this.reviews.length;
  }

  // --- LÓGICA VISUAL ---
  changeImage(image: string) {
    this.currentImage = image;
  }

  // --- NUEVA LÓGICA: CARRITO ---
  addToCart() {
    // 1. Llamamos al servicio para guardar el producto
    this.cartService.addToCart(this.product);
    
    // 2. Redirigimos a la página del carrito (que crearemos a continuación)
    this.router.navigateByUrl('/cart-page'); 
  }
}