import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
// IMPORTAR EL COMPONENTE NUEVO
import { CartPageComponent } from './components/pages/cart-page/cart-page.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsPageComponent }, 
  { path: 'product/:id', component: ProductDetailsComponent },
  
  // AÑADE ESTA LÍNEA EXACTA:
  { path: 'cart-page', component: CartPageComponent }, 
];