import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { ProductService } from '../../../services/products.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  // ¡AQUÍ ESTÁ LA CLAVE!
  // Mapeamos los valores exactos de tu Backend (id) con nombres para la Web (name)
  // Backend enum: ["cpu", "gpu", "ram", "ssd", "hdd", "motherboard", "psu", "case", "cooling", "display", "mouse", "keyboard", "others"]
  categories = [
    { id: 'cpu', name: 'Procesadores', icon: 'assets/icons/cpu.png' }, // Puedes añadir iconos luego
    { id: 'gpu', name: 'Gráficas', icon: 'assets/icons/gpu.png' },
    { id: 'motherboard', name: 'Placas Base', icon: 'assets/icons/motherboard.png' },
    { id: 'ram', name: 'RAM', icon: 'assets/icons/ram.png' },
    { id: 'ssd', name: 'Discos SSD', icon: 'assets/icons/ssd.png' },
    { id: 'case', name: 'Torres', icon: 'assets/icons/case.png' },
    { id: 'cooling', name: 'Refrigeración', icon: 'assets/icons/fan.png' },
    { id: 'psu', name: 'Fuentes', icon: 'assets/icons/psu.png' },
    { id: 'display', name: 'Monitores', icon: 'assets/icons/screen.png' },
    { id: 'mouse', name: 'Ratones', icon: 'assets/icons/mouse.png' },
    { id: 'keyboard', name: 'Teclados', icon: 'assets/icons/keyboard.png' }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Traer productos destacados (por ahora trae todos, luego podemos filtrar por 'stars' o 'stock')
    this.productService.getProducts().subscribe((serverProducts) => {
      this.products = serverProducts;
    });
  }
}