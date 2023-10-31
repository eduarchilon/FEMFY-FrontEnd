import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { constants } from 'src/app/constans/constants';
import { Cycle } from 'src/app/models/cicle.model';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { UserLogin } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss'],
})
export class LoginUsuarioComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isUserNotFinded: boolean = false;

  spinnerConsumer: string = 'LoginUsuarioComponent';

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private router: Router,
    private cycleService: CicleService,
    private questionService: QuestionService,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService,
    private historial: HistorialService
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.authService
      .login(this.formLogin?.value?.userName, this.formLogin?.value?.password)
      .subscribe({
        next: (authenticatedUser: any) => {
          this.loaderService.showLoader();
          if (authenticatedUser) {
            const userId: any =
              this.localStorageService.getUserByLogin()?.idUser;
            //SET CYCLE
            this.cycleService
              .getAllCycles(userId)
              .subscribe((cycles: Cycle[] | any[]) => {
                const cycleInit: any = cycles?.filter(
                  (cycle: any) => cycle?.status === 'init'
                );

                this.localStorageService.setKeyValueLocalStorage(
                  constants.USER,
                  JSON.stringify({
                    ...this.localStorageService.getUserByLogin(),
                    idCycle: cycleInit[0]?.id,
                  })
                );
              });
            //SET QUESTIOMenstruation
            this.questionService
              .createUserMenstruationQuestion({
                userId: this.localStorageService.getUserByLogin()?.idUser,
              })
              .subscribe((question: QuestionUserMenstruation | any) => {
                this.localStorageService.setKeyValueLocalStorage(
                  constants.USER,
                  JSON.stringify({
                    ...this.localStorageService.getUserByLogin(),
                    questionId: question?.id,
                  })
                );
              });
            this.loaderService.hideLoader();
            this.router.navigate(['/']).then(() => {
              location.reload();
            });
          } else {
            this.loaderService.hideLoader();
            this.isUserNotFinded = true;
          }
        },
        error: (error) => error,
      });
  }
}
