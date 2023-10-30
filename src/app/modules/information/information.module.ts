import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InformationHistorialComponent } from './components/information-historial/information-historial.component';
import { InformationUserComponent } from './components/information-user/information-user.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    InformationComponent,
    InformationHistorialComponent,
    InformationUserComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [HistorialService, LocalStorageService],
})
export class InformationModule {}
