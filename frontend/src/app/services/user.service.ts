import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user.model';

// Interfaces para lo que nos envía el backend al loguearnos
interface IUserLogin {
  email: string;
  password: string;
}

interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // URL del Backend
  private readonly USER_LOGIN_URL = 'http://localhost:3000/api/users/login';
  private readonly USER_REGISTER_URL = 'http://localhost:3000/api/users/register';

  // BehaviorSubject: Para saber en todo momento quién es el usuario actual
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }

  // 1. LOGIN
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(this.USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          // Opcional: Mostrar notificación de éxito
        },
        error: (error) => {
          console.error('Error en login', error);
          // Opcional: Mostrar notificación de error
        }
      })
    );
  }

  // 2. LOGOUT
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem('User');
    window.location.reload(); // Recargamos para limpiar estados
  }

  // 3. REGISTRO (Lo usaremos después)
  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(this.USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          // Nota: Dependiendo de tu backend, el registro a veces devuelve el usuario logueado o solo un mensaje
          // Si devuelve usuario + token, hacemos esto:
          // this.setUserToLocalStorage(user);
          // this.userSubject.next(user);
        }
      })
    );
  }

  // --- MÉTODOS PRIVADOS (LocalStorage) ---

  private setUserToLocalStorage(user: User) {
    localStorage.setItem('User', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem('User');
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
  public get currentUser(): User {
  return this.userSubject.value;
}
}

