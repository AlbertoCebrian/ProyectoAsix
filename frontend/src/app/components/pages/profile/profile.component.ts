import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  profileForm!: FormGroup;
  user!: User;
  
  // DATOS ESTÁTICOS (LA FUMADA MOLONA DE LOS PUNTOS) 😎
  points = 1250;
  level = "Tecnólogo Experto";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Obtenemos el usuario actual
    this.userService.userObservable.subscribe(currentUser => {
      this.user = currentUser;
      
      // Rellenamos el formulario con sus datos
      this.profileForm = this.formBuilder.group({
        name: [currentUser.name, Validators.required],
        email: [{value: currentUser.email, disabled: true}], // El email no se suele dejar cambiar fácil
        address: ['Calle Falsa 123, Madrid', Validators.required], // Dato fake por ahora
        phone: ['666 777 888', Validators.required]             // Dato fake por ahora
      });
    });
  }

  saveChanges() {
    if (this.profileForm.invalid) return;
    alert('¡En una app real, aquí guardaríamos los cambios en la base de datos! 💾');
    // Aquí llamaríamos al backend más adelante
  }
}