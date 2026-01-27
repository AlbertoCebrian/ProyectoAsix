import { CartItem } from "./CartItem"; // <--- Fíjate que ahora pone CartItem con mayúsculas

export class Order {
  id!: number;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  createdAt!: string;
  status!: string;
  user!: string; // ID del usuario
}