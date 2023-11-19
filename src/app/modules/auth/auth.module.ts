import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { CommonsModule } from 'src/app/commons/commons.module';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginGuardian } from 'src/app/utils/login-guardian.guardian';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { QuestionMenopausicaService } from 'src/app/services/question-menopausica/question-menopausica.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [LoginUsuarioComponent, RegistroUsuarioComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    NgIf,
    StoreModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    SpinnerService,
    AuthService,
    CicleService,
    LoaderService,
    NotificationService,
    LoginGuardian,
    LocalStorageService,
    QuestionService,
    HistorialService,
    QuestionMenopausicaService,
    UserService,
  ],
})
export class AuthModule {}
