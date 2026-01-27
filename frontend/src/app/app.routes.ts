import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component'; 
import { LoginPageComponent } from './components/pages/login-page/login-page.component'; 
// AÑADE ESTA LÍNEA DE IMPORTACIÓN:
import { RegisterPageComponent } from './components/pages/register-page/register-page.component'; 
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrdersPageComponent } from './components/pages/orders/orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsPageComponent }, 
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart-page', component: CartPageComponent }, 
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'orders', component: OrdersPageComponent },
];