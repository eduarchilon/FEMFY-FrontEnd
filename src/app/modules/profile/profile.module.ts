import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ]
})
export class ProfileModule { }
