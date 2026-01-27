import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister'; // OJO: Definiremos esta interfaz abajo si no existe, o usamos 'any' por ahora para no liarnos.

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  
  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '/'; // Al registrarse, vamos al inicio

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador personalizado para comprobar que las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    
    const user = {
      name: fv.name,
      email: fv.email,
      password: fv.password
    };

    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}