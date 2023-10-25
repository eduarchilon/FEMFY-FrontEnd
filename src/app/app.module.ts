import { DocumentationModule } from './modules/documentation/documentation.module';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { HomeRoutingModuleModule } from './modules/home/home-routing-module.module';
import { CommonModule } from '@angular/common';
import { HomeModule } from './modules/home/home.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { CommonsModule } from './commons/commons.module';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appStore } from './redux/store/app.store';
import { ForumModule } from './modules/forum/forum.module';
import { SurveyModule } from './modules/survey/survey.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoaderService } from './services/loader/loader.service';
import { RouterModule } from '@angular/router';
import { MatIconService } from './services/mat-icon/mat-icon.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HistorialModule } from './modules/historial/historial.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CommonsModule,
    AuthModule,
    CalendarModule,
    ProfileModule,
    ForumModule,
    DocumentationModule,
    HomeModule,
    HomeRoutingModuleModule,
    SurveyModule,
    AuthRoutingModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    StoreModule.forRoot(appStore),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    HistorialModule,
  ],
  providers: [
    LoaderService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    MatIconService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {
  constructor(private customMatIcon: MatIconService) {
    this.customMatIcon.registerMatIcons();
  }
}
