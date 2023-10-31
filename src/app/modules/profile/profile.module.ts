import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms'
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  providers:[AuthService, LocalStorageService]
})
export class ProfileModule { }
