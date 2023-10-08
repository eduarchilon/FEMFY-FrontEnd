import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
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
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  isLogging: boolean = false;
  userResponse!: UserResponse;

  ngOnInit(): void {
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.userResponse = data?.user;
      if (!this.userResponse) {
        this.userResponse = this.localStorageService.getUserByLogin();
      }
      this.userResponse ? (this.isLogging = true) : (this.isLogging = false);
    });
    //test
    //this.authService.testLocalHostServer();
  }
}
