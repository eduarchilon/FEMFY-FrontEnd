import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HeaderUsuarioComponent } from './header-usuario/header-usuario.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterUsuarioComponent } from './footer-usuario/footer-usuario.component';
import { AuthService } from '../services/auth/auth.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    HeaderUsuarioComponent,
    FooterUsuarioComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    StoreModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [HeaderUsuarioComponent, FooterUsuarioComponent, SpinnerComponent],
  providers: [AuthService, LocalStorageService],
})
export class CommonsModule {}
