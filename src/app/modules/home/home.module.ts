import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from 'src/app/services/auth.service';
import { LandingComponent } from './landing/landing.component';
import { IndexComponent } from './index/index.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [HomeComponent, LandingComponent, IndexComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  exports: [HomeComponent, IndexComponent],
  providers: [AuthService],
})
export class HomeModule {}
