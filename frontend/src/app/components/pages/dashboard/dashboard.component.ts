import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Para los enlaces
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }
}