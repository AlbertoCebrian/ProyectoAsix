// frontend/src/app/shared/models/product.model.ts

// 1. El tipo 'Category' debe coincidir EXACTAMENTE con el nuevo enum del backend
export type ProductCategory = "cpu" | "gpu" | "ram" | "ssd" | "hdd" | 
                          "motherboard" | "psu" | "case" | "cooling" | 
                          "display" | "mouse" | "keyboard" | "others";

// 2. La interfaz 'Product' debe tener todas las propiedades en inglés
export interface Product {
  _id: string; // Mongo siempre añade un _id
  name: string;
  price: number;
  category: ProductCategory; // Usamos el tipo actualizado

  // Campos opcionales (con '?')
  brand?: string;
  model?: string;
  description?: string;
  stock?: number;
  supplierId?: string; // Corresponde a 'supplierId' del backend
  images?: string[]; // Corresponde a 'images' (array)
  attributes?: any; // Corresponde a 'attributes'
  
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}