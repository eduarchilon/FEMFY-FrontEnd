import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LandingComponent } from './landing/landing.component';
import { IndexComponent } from './index/index.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StoreModule } from '@ngrx/store';
import { initialLoginState } from 'src/app/services/redux/reducers/login.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterCicleComponent } from './components/register-cicle/register-cicle.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { CicleHistorialComponent } from './components/cicle-historial/cicle-historial.component';
import { QuestionService } from 'src/app/services/question/question.service';
import { MatMenuModule } from '@angular/material/menu';
import { EditCycleComponent } from './components/edit-cycle/edit-cycle.component';
import { DeleteCycleComponent } from './components/delete-cycle/delete-cycle.component';
import { FinishCycleComponent } from './components/finish-cycle/finish-cycle.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecomendationsComponent } from './components/recomendations/recomendations.component';
import { RecomendationService } from 'src/app/services/recomendation/recomendation.service';
import { CutTextPipe } from 'src/app/utils/pipes/cut-text/cut-text.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { WhatsAppService } from 'src/app/services/whats-app/whats-app.service';
import { PieNotificationComponent } from './components/pie-notification/pie-notification.component';
import { HourNotificationComponent } from './components/hour-notification/hour-notification.component';

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    IndexComponent,
    PieChartComponent,
    RegisterCicleComponent,
    CicleHistorialComponent,
    EditCycleComponent,
    DeleteCycleComponent,
    FinishCycleComponent,
    RecomendationsComponent,
    PieNotificationComponent,
    HourNotificationComponent,
    CutTextPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    AgChartsAngularModule,
    StoreModule,
    MatDialogModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
  ],
  exports: [HomeComponent, IndexComponent],
  providers: [
    AuthService,
    LocalStorageService,
    CicleService,
    QuestionService,
    LoaderService,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    RecomendationService,
    NotificationService,
    WhatsAppService,
  ],
})
export class HomeModule {}
