import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [],
  providers: [AuthService, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
})
export class CalendarModule {}
