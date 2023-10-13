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
import { ForumComponent } from './modules/forum/forum.component';
import { TopicComponent } from './modules/forum/topic/topic.component';
import { ForumModule } from './modules/forum/forum.module';
import { SurveyModule } from './modules/survey/survey.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoaderService } from './services/loader/loader.service';

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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    StoreModule.forRoot(appStore),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [LoaderService, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
