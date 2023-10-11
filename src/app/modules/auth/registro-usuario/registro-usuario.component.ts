import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { emptyUserResponse } from 'src/app/models/user.model';
import { QuestionService } from 'src/app/services/question/question.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/store/app.store';
import { setIdQuestionMenstruation } from 'src/app/redux/actions/question.action';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent {
  formRegister: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  spinnerConsumer: string = 'RegistroUsuarioComponent';

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private router: Router,
    private questionsService: QuestionService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  signupUser(): void {
    this.authService
      .register({
        userName: this.formRegister?.value?.userName,
        password: this.formRegister?.value?.password,
        birthdate: this.formRegister?.value?.birthdate,
        email: this.formRegister?.value?.email,
      })
      .subscribe({
        next: (response: any) => {
          this.spinnerService.showProgressSpinner(this.spinnerConsumer);
          if (response) {
            this.spinnerService.hideProgressSpinner(this.spinnerConsumer);
            this.authService
              .login(response?.userName, response?.password)
              .subscribe({
                next: (authenticatedUser: any) => {
                  this.spinnerService.showProgressSpinner(this.spinnerConsumer);
                  if (authenticatedUser) {
                    this.spinnerService.hideProgressSpinner(
                      this.spinnerConsumer
                    );
                    this.questionsService
                      .createUserMenstruationQuestion({
                        userId:
                          this.localStorageService.getUserByLogin()?.idUser,
                      })
                      .subscribe({
                        next: (response) => {
                          console.log(response);
                          this.store.dispatch(
                            setIdQuestionMenstruation({
                              idQuestion: response?.id,
                            })
                          );
                        },
                        error: (error) => error,
                      });
                    this.router.navigate(['cuestionario']);
                  } else {
                    this.spinnerService.hideProgressSpinner(
                      this.spinnerConsumer
                    );
                  }
                },
                error: (error) => error,
              });
          } else {
            this.spinnerService.hideProgressSpinner(this.spinnerConsumer);
          }
        },
        error: (error) => error,
      });
  }
}
