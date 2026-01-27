import { Product } from "./product.model"; // Asegúrate de que product.model existe

export class CartItem {
  product!: Product;
  quantity: number = 1;
  price!: number; // Precio total (precio * cantidad)
}