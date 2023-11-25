import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserResponse } from 'src/app/models/user.model';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SurveyComponent } from '../../survey/survey.component';
import { AppState } from 'src/app/services/redux/store/app.store';
import { Store } from '@ngrx/store';
import { userDataInit } from 'src/app/services/redux/actions/user/user-data-page.action';
import { loadUserDataSuccess } from 'src/app/services/redux/actions/user/user-data-api.action';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent implements OnInit {
  formRegister: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  spinnerConsumer: string = 'RegistroUsuarioComponent';

  userNameFinded!: string;
  emailFinded!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private userDataCycleService: UserService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  signupUser(): void {
    this.userNameFinded = '';
    this.emailFinded = '';

    if (this.formRegister.invalid) {
      this.formRegister.markAsTouched();
    } else {
      // Validar contraseñas que no coinciden
      const password = this.formRegister.get('password')?.value;
      const passwordRepeat = this.formRegister.get('passwordRepeat')?.value;
      if (password !== passwordRepeat) {
        return;
      }
      // Validar fecha de nacimiento mayor que el día de hoy
      const birthdate = new Date(this.formRegister.get('birthdate')?.value);
      const today = new Date();
      if (birthdate > today) {
        return;
      }

      this.authService
        .register({
          userName: this.formRegister?.value?.userName,
          password: this.formRegister?.value?.password,
          birthdate: this.formRegister?.value?.birthdate,
          email: this.formRegister?.value?.email,
          emotion: '10:00',
        })
        .subscribe({
          next: (response: Observable<any>) => {
            this.loaderService.showLoader();
            response?.subscribe({
              next: (userResponse: UserResponse | any) => {
                this.authService
                  .login(userResponse?.userName, userResponse?.password)
                  .subscribe({
                    next: (userLogin: UserResponse | any) => {
                      this.loaderService.showLoader();
                      //NOTIFICACION PUSH
                      if (userLogin) {
                        this.userDataCycleService.setUserDataCycleInformation(
                          userLogin
                        ); //COMENTAR PARA PROBAR
                        this.loaderService.hideLoader();
                        this.router.navigate(['']);
                        this.store.dispatch(
                          loadUserDataSuccess({ userData: userLogin })
                        );
                        this.dialog.open(SurveyComponent, {
                          panelClass: [
                            '!max-w-[95vw]',
                            'max-lg:!w-[80%]',
                            'max-md:!w-[100vw]',
                            'max-xl:!w-[50%]',
                            '!w-[50%]',
                            '!rounded-[20px]',
                          ],
                          disableClose: true,
                        });
                        this.notificationService
                          .enviarNotificacion(
                            '¡Bienvenida a Femfy!',
                            'Esperamos que puedas llevarte una linda experiencia con nostros. 😊'
                          )
                          .subscribe({
                            next: (res: any) => res,
                          });
                      }
                      this.loaderService.hideLoader();
                    },
                  });
              },
            });
          },
          error: (error) => error,
        });
    }
  }
}
