import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [CalendarComponent],
})
export class CalendarModule {}
