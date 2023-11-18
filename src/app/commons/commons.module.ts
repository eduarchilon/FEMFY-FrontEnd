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
import { LoaderComponent } from './loader/loader.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { LoaderService } from '../services/loader/loader.service';

@NgModule({
  declarations: [
    HeaderUsuarioComponent,
    FooterUsuarioComponent,
    ChatbotComponent,
    SpinnerComponent,
    LoaderComponent,
    MobileMenuComponent,
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
    MatTooltipModule,
    MatMenuModule,
  ],
  exports: [
    HeaderUsuarioComponent,
    FooterUsuarioComponent,
    ChatbotComponent,
    SpinnerComponent,
    LoaderComponent,
    MobileMenuComponent,
  ],
  providers: [AuthService, LocalStorageService, LoaderService],
})
export class CommonsModule {}
