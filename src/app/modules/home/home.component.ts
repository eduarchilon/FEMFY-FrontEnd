import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { AppState } from 'src/app/services/redux/store/app.store';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    // private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  isLogging: boolean = false;
  userResponse!: UserResponse;

  ngOnInit(): void {
    // this.store.dispatch(loadCycles());
    this.userResponse = this.localStorageService.getUserByLogin();
    this.userResponse ? (this.isLogging = true) : (this.isLogging = false);
  }
}
