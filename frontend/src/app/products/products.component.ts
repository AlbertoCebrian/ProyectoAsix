import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // necesario para *ngIf, *ngFor y pipes

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule], // <-- aquí va
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [
    {
      id: 1,
      name: 'Procesador Intel i7',
      price: 350,
      image: 'assets/intel.png',
      description: 'Procesador de alto rendimiento para gaming y productividad.',
      specs: ['8 núcleos', '16 hilos', '3.6GHz base', '4.9GHz turbo']
    },
    {
      id: 2,
      name: 'RAM 16GB DDR4',
      price: 80,
      image: 'assets/ram.png',
      description: 'Memoria rápida y estable para tu PC.',
      specs: ['16GB', 'DDR4', '3200MHz']
    }
  ];

  selectedProduct: any = null;

  openProduct(product: any) {
    this.selectedProduct = product;
  }

  closeModal() {
    this.selectedProduct = null;
  }
}
