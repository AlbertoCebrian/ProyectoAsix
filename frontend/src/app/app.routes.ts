import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';

export const routes: Routes = [
  // 1. La ruta vacía ('') es la Portada. Carga el Home automáticamente.
  { path: '', component: HomeComponent },

  // 2. Dejamos esta ruta por si quieres ver el catálogo completo (opcional)
  { path: 'products', component: ProductsPageComponent },

  // 3. (Futuro) Aquí pondremos la página de detalle
  // { path: 'product/:id', component: ProductDetailComponent },

  // 4. Comodín: Si ponen cualquier cosa rara, redirigir al Home
  { path: '**', redirectTo: '' }
];