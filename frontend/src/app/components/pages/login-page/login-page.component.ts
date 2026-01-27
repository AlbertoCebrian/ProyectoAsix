import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // <--- IMPORTANTE
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // <--- AÑADIR ReactiveFormsModule
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = ''; // A dónde ir después de loguearse

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Definimos el formulario y sus reglas (validaciones)
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Por defecto, al loguearse vamos a la Home (o al carrito si vienes de comprar)
    this.returnUrl = '/'; 
  }

  // Getter para acceder fácil a los campos en el HTML
  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;

    // 1. Si el formulario es inválido, no hacemos nada
    if (this.loginForm.invalid) return;

    // 2. Llamamos al servicio (Backend)
    this.userService.login({
      email: this.fc['email'].value,
      password: this.fc['password'].value
    }).subscribe(() => {
      // 3. Si todo va bien, redirigimos
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}