import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule, isDevMode,
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
import { SurveyComponent } from './modules/survey/survey.component';
import { ForumComponent } from './modules/forum/forum.component';
import { TopicComponent } from './modules/forum/topic/topic.component';
import { ForumModule } from './modules/forum/forum.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CommonsModule,
    AuthModule,
    CalendarModule,
    ForumModule,
    HomeModule,
    SurveyComponent,
    HomeRoutingModuleModule,
    AuthRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
