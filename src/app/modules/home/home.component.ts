import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  isLogging: boolean = false;

  ngOnInit(): void {
    this.authService._userFinded.subscribe((user: any) => {
      user ? (this.isLogging = true) : (this.isLogging = false);
    });
  }
}
