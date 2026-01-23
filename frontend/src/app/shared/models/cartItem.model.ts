import { Product } from "./product.model";

export class CartItem {
  quantity: number = 1;
  price: number; 

  constructor(public product: Product) { 
    this.price = this.product.price;
  }
}