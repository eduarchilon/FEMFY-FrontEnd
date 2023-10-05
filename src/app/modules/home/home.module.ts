import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    IndexComponent,
    PieChartComponent,
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
  ],
  exports: [HomeComponent, IndexComponent],
  providers: [AuthService, LocalStorageService],
})
export class HomeModule {}
