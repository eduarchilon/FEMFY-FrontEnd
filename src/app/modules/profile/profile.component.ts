import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { AppState } from 'src/app/redux/store/app.store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  studyTypes: string[] = [
    "Ginecológico",
    "Obstetra",
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin()
  }

  userResponse!: UserResponse;
  userStorage!: UserResponse;

  
  selectedStudyType: string | null = null;
}
