import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeaderDefaultComponent } from 'src/app/commons/header-default/header-default.component';
import { HeaderUsuarioComponent } from 'src/app/commons/header-usuario/header-usuario.component';
import { FooterUsuarioComponent } from 'src/app/commons/footer-usuario/footer-usuario.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderDefaultComponent,
    HeaderUsuarioComponent,
    FooterUsuarioComponent,
  ],
  imports: [CommonModule, AppRoutingModule, MatIconModule, MatDividerModule],
  exports: [],
})
export class HomeModule {}
