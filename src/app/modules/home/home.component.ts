import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CUSTOM_ICONS } from 'src/app/constans/mat-icon.data';
import { UserResponse } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  icon: any = CUSTOM_ICONS?.instagram;

  isLogging: boolean = false;
  userResponse!: UserResponse;

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    this.userResponse ? (this.isLogging = true) : (this.isLogging = false);
  }
}
