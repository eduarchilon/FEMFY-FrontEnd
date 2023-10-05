import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  isLogging: boolean = true;

  ngOnInit(): void {
    const userLoginSession = this.localStorageService.getUserByLogin();
    userLoginSession ? (this.isLogging = true) : (this.isLogging = false);
  }
}
