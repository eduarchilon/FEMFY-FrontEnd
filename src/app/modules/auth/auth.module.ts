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
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { CommonsModule } from 'src/app/commons/commons.module';

@NgModule({
  declarations: [LoginUsuarioComponent, RegistroUsuarioComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [SpinnerService, AuthService, CicleService, LoaderService],
})
export class AuthModule {}
