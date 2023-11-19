import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    SubscriptionComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    FormsModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers:[
    LocalStorageService,
  ]
})
export class SubscriptionModule { }
