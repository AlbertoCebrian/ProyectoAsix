import { CartItem } from "./cartItem.model";

// ¡IMPORTANTE! Debe poner 'export class'
export class Cart {
  items: CartItem[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;
}