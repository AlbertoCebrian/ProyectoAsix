import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/products.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  
  productForm!: FormGroup;
  isSubmitting = false;
  
  products: Product[] = [];
  editMode = false;
  currentProductId = '';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required], // Campo temporal para el input
      category: ['others', Validators.required],
      description: [''],
      attributesText: [''], // Campo temporal para el texto de specs
      stock: [10, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  get fc() { return this.productForm.controls; }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  submit() {
    if (this.productForm.invalid) return;
    this.isSubmitting = true;

    // 1. TRANSFORMACIÓN DE IMÁGENES
    // El backend espera 'images' (Array), el form tiene 'imageUrl' (String)
    const imagesArray = this.productForm.value.imageUrl
        .split(',')
        .map((url: string) => url.trim());

    // 2. TRANSFORMACIÓN DE ESPECIFICACIONES (Texto -> Objeto)
    // El backend espera 'attributes' (Objeto), el form tiene 'attributesText' (String)
    const attributesRaw = this.productForm.value.attributesText || '';
    const attributesObj: any = {};
    
    // Partimos por saltos de línea
    const lines = attributesRaw.split('\n');
    
    lines.forEach((line: string) => {
      if (line.includes(':')) {
        const parts = line.split(':');
        const key = parts[0].trim();
        // Unimos el resto por si el valor también tenía dos puntos
        const value = parts.slice(1).join(':').trim();
        
        if(key && value) {
          attributesObj[key] = value;
        }
      }
    });

    // 3. PREPARAR EL OBJETO PARA EL BACKEND
    const productData: Product = {
      ...this.productForm.value, // Copia nombre, precio, stock, etc.
      images: imagesArray,       // Sobrescribe con el array de imágenes
      attributes: attributesObj, // Añade el objeto de specs generado
      _id: this.editMode ? this.currentProductId : undefined
    };

    // Enviamos al backend
    const request = this.editMode 
      ? this.productService.updateProduct(productData)
      : this.productService.createProduct(productData);

    request.subscribe({
      next: () => {
        alert(this.editMode ? 'Producto actualizado ✅' : 'Producto creado ✅');
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar. Mira la consola.');
        this.isSubmitting = false;
      }
    });
  }

  startEdit(product: Product) {
    this.editMode = true;
    this.currentProductId = product._id!; 

    // 4. TRANSFORMACIÓN INVERSA (Para editar)
    // Convertimos el Objeto de la DB a Texto para el formulario
    let attributesString = '';
    if (product.attributes) {
      attributesString = Object.keys(product.attributes)
        .map(key => `${key}: ${product.attributes[key]}`)
        .join('\n');
    }

    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      // Convertimos Array -> String separado por comas
      imageUrl: product.images ? product.images.join(', ') : '', 
      category: product.category,
      description: product.description,
      attributesText: attributesString, // Rellenamos el cuadro de texto
      stock: product.stock || 0
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteProduct(product: Product) {
    if(!confirm(`¿Seguro que quieres borrar "${product.name}"?`)) return;

    if (product._id) {
        this.productService.deleteProduct(product._id).subscribe(() => {
          this.products = this.products.filter(p => p._id !== product._id);
          alert('Producto eliminado 🗑️');
        });
    }
  }

  resetForm() {
    this.isSubmitting = false;
    this.editMode = false;
    this.currentProductId = '';
    this.productForm.reset();
    this.loadProducts();
  }
}