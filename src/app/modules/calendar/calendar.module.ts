import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { EventDayDrawerComponent } from './components/event-day-drawer/event-day-drawer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { StoreModule } from '@ngrx/store';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { CicleService } from 'src/app/services/cicle/cicle.service';
registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [CalendarComponent, EventDayDrawerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    StoreModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [
    AuthService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    CalendarService,
    LocalStorageService,
    SpinnerService,
    CicleService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CalendarModule {}
