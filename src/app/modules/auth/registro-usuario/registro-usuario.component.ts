import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { UserResponse } from 'src/app/models/user.model';
import { QuestionService } from 'src/app/services/question/question.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/services/redux/store/app.store';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { constants } from 'src/app/constans/constants';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Cycle } from 'src/app/models/cicle.model';

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
    private spinnerService: SpinnerService,
    private router: Router,
    private questionsService: QuestionService,
    private localStorageService: LocalStorageService,
    private cicleService: CicleService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
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
        })
        .subscribe({
          next: (response: Observable<any> | any) => {
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
                        this.loaderService.hideLoader();
                        this.notificationService
                          .enviarNotificacion(
                            '¡Bienvenida a Femfy!',
                            'Gracias por registrarte 😊'
                          )
                          .subscribe({
                            next: (res: any) => res,
                          });
                      }
                      this.router.navigate(['cuestionario']);
                      this.questionsService
                        .createUserMenstruationQuestion({
                          userId:
                            this.localStorageService.getUserByLogin()?.idUser,
                        })
                        .subscribe(
                          (question: QuestionUserMenstruation | any) => {
                            const idQuestion = question?.id;
                            this.localStorageService.setKeyValueLocalStorage(
                              constants.USER,
                              JSON.stringify({
                                ...this.localStorageService.getUserByLogin(),
                                idQuestion: idQuestion,
                              })
                            );
                          }
                        );
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
