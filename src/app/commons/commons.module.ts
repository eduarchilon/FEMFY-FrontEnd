import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HeaderUsuarioComponent } from './header-usuario/header-usuario.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterUsuarioComponent } from './footer-usuario/footer-usuario.component';

@NgModule({
  declarations: [HeaderUsuarioComponent, FooterUsuarioComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule,
  ],
  exports: [HeaderUsuarioComponent],
})
export class CommonsModule {}
