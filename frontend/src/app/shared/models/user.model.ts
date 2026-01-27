export class User {
  id!: string;
  email!: string;
  name!: string;
  token!: string; // ¡Importante! Aquí guardaremos el "pasaporte"
  isAdmin!: boolean;
  address!: string;
}