import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { initialLoginState } from 'src/app/redux/reducers/login.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterCicleComponent } from './components/register-cicle/register-cicle.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { CicleService } from 'src/app/services/cicle/cicle.service';

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    IndexComponent,
    PieChartComponent,
    RegisterCicleComponent,
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
  ],
  exports: [HomeComponent, IndexComponent],
  providers: [
    AuthService,
    LocalStorageService,
    CicleService,
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
})
export class HomeModule {}
