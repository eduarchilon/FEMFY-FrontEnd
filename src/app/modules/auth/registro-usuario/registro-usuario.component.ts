import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { UserResponse, emptyUserResponse } from 'src/app/models/user.model';
import { QuestionService } from 'src/app/services/question/question.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/store/app.store';
import { setIdQuestionMenstruation } from 'src/app/redux/actions/question.action';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { constants } from 'src/app/constans/constants';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { Observable } from 'rxjs';

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
    email: new FormControl('', Validators.required),
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
    private store: Store<AppState>,
    private cicleService: CicleService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {}

  signupUser(): void {
    this.userNameFinded = '';
    this.emailFinded = '';
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
          if (response === this.formRegister?.value?.userName) {
            this.userNameFinded = response;
            this.loaderService.hideLoader();
          }
          if (response === this.formRegister?.value?.email) {
            this.emailFinded = response;
            this.loaderService.hideLoader();
          }
          response.subscribe({
            next: (res: UserResponse | any) => {
              this.authService.login(res?.userName, res?.password).subscribe({
                next: (userLogin: UserResponse | any) => {
                  this.loaderService.showLoader();
                  if (userLogin) {
                    this.loaderService.hideLoader();
                    this.router.navigate(['cuestionario']);
                    this.questionsService
                      .createUserMenstruationQuestion({
                        userId:
                          this.localStorageService.getUserByLogin()?.idUser,
                      })
                      .subscribe((question: QuestionUserMenstruation | any) => {
                        this.localStorageService.setKeyValueLocalStorage(
                          constants.ID_REGISTER,
                          question?.id
                        );
                      });
                    this.cicleService
                      .registerCycle({
                        idUser:
                          this.localStorageService.getUserByLogin()?.idUser,
                        dateBeging: '',
                        daysOfBleeding: 0,
                        status: '',
                      })
                      .subscribe({
                        next: (response) => console.log(response),
                        error: (error) => error,
                      });
                  }
                },
              });
            },
          });
          this.loaderService.hideLoader();

          //   // this.authService
          //   //   .login(response?.userName, response?.password)
          //   //   .subscribe({
          //   //     next: (authenticatedUser: any) => {
          //   //       this.spinnerService.showProgressSpinner(this.spinnerConsumer);
          //   //       if (authenticatedUser) {
          //   //         this.spinnerService.hideProgressSpinner(
          //   //           this.spinnerConsumer
          //   //         );
          //   //         this.questionsService
          //   //           .createUserMenstruationQuestion({
          //   //             userId:
          //   //               this.localStorageService.getUserByLogin()?.idUser,
          //   //           })
          //   //           .subscribe({
          //   //             next: (response) => {
          //   //               this.localStorageService.setKeyValueLocalStorage(
          //   //                 constants.ID_REGISTER,
          //   //                 response?.id
          //   //               );
          //   //               // this.cicleService
          //   //               //   .registerCycle({
          //   //               //     idUser: response?.userId,
          //   //               //     dateBeging: new Date(),
          //   //               //     daysOfBleeding: 0,
          //   //               //     dateEnd: new Date(),
          //   //               //     status: '',
          //   //               //   })
          //   //               //   .subscribe({
          //   //               //     next: (response) => response,
          //   //               //     error: (error) => error,
          //   //               //   });
          //   //               this.store.dispatch(
          //   //                 setIdQuestionMenstruation({
          //   //                   idQuestion: response?.id,
          //   //                 })
          //   //               );
          //   //             },
          //   //             error: (error) => error,
          //   //           });
          //   //         this.router.navigate(['cuestionario']);
          //   //       } else {
          //   //         this.spinnerService.hideProgressSpinner(
          //   //           this.spinnerConsumer
          //   //         );
          //   //       }
          //   //     },
          //   //     error: (error) => error,
          //   //   });
          // } else {
          //   this.loaderService.showLoader();
        },
        error: (error) => error,
      });
  }
}
