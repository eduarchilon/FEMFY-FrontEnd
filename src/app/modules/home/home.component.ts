import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { CUSTOM_ICONS } from 'src/app/constans/mat-icon.data';
import { UserResponse } from 'src/app/models/user.model';
import { loadCycles } from 'src/app/services/redux/actions/cycle.action';
import { AppState } from 'src/app/services/redux/store/app.store';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteCycleComponent } from './components/delete-cycle/delete-cycle.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,

  ) {}

  icon: any = CUSTOM_ICONS?.instagram;

  isLogging: boolean = false;
  userResponse!: UserResponse;

  ngOnInit(): void {
    // this.store.dispatch(loadCycles());
    this.userResponse = this.localStorageService.getUserByLogin();
    this.userResponse ? (this.isLogging = true) : (this.isLogging = false);
  }
}
