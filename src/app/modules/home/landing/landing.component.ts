import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  get isLogging(): boolean {
    return this.authService.isLoggin;
  }

  ngOnInit(): void {}

  handleLoggingUser(): void {
    this.authService.loggingUser();
  }
}
