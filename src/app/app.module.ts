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
import { appStore } from './services/redux/store/app.store';
import { ForumModule } from './modules/forum/forum.module';
import { SurveyModule } from './modules/survey/survey.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoaderService } from './services/loader/loader.service';
import { RouterModule } from '@angular/router';
import { MatIconService } from './services/mat-icon/mat-icon.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HistorialModule } from './modules/historial/historial.module';
import { LoginGuardian } from './utils/login-guardian.guardian';
import { EffectsModule } from '@ngrx/effects';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { MercadoPagoComponent } from './modules/subscription/mercado-pago/mercado-pago.component';
import { InformationModule } from './modules/information/information.module';
import { UserDataEffects } from './services/redux/effects/user-data.effect';
import { CycleUserEffects } from './services/redux/effects/cycle-user.effect';
import { QuestionMenstruationUserEffects } from './services/redux/effects/question-menstruation-user.effect';
import { QrCodeModule } from 'ng-qrcode';
import { PostEffects } from './services/redux/effects/post.effect';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ForumRoutingModule } from './modules/forum/forum-routing.module';

@NgModule({
  declarations: [AppComponent, MercadoPagoComponent],
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
    SubscriptionModule,
    QrCodeModule,
    BrowserAnimationsModule,
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
    EffectsModule.forRoot([
      CycleUserEffects,
      UserDataEffects,
      QuestionMenstruationUserEffects,
      PostEffects,
    ]),
    InformationModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ForumRoutingModule,
  ],
  providers: [
    LoaderService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    MatIconService,
    LoginGuardian,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {
  constructor(private customMatIcon: MatIconService) {
    this.customMatIcon.registerMatIcons();
  }
}
