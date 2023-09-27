import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginUsuarioComponent, RegistroUsuarioComponent],
  imports: [CommonModule, AuthRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AuthModule {}
