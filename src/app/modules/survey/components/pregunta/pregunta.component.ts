import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { selectIdQuestionMenstruationFeature } from './../../../../redux/selectors/question.selector';
import { constants } from 'src/app/constans/constants';
import { SurveyComponent } from '../../survey.component';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { FisrtCycle } from 'src/app/models/cicle.model';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss'],
})
export class PreguntaComponent implements OnInit {
  @Input() preguntas: string[] = [];
  indicePreguntaActual: number = 0;
  userResponse!: UserResponse;
  idRegister!: number;

  formOneRegister: FormGroup = new FormGroup({
    lastTime: new FormControl('', Validators.required),
  });

  formTwoRegister: FormGroup = new FormGroup({
    lastCycleDuration: new FormControl('', Validators.required),
  });

  formThreeRegister: FormGroup = new FormGroup({
    regularCycleDuration: new FormControl('', Validators.required),
  });

  formFourRegister: FormGroup = new FormGroup({
    regular: new FormControl(false, Validators.required),
  });

  formFiveRegister: FormGroup = new FormGroup({
    bleedingDuration: new FormControl('', Validators.required),
  });

  firstCycleEnd: any = {
    initCycle: '',
    cycleDuration: '',
    regularCycle: '',
    dayOfBleding: '',
  };

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private questionsService: QuestionService,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    private surveyComponent: SurveyComponent,
    private cycleServie: CicleService
  ) {}
  ngOnInit(): void {
    this.store
      .select(selectIdQuestionMenstruationFeature)
      .subscribe((data: any) => {
        this.idRegister = data?.idQuestion;
      });
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.userResponse = data?.user;
      if (!this.userResponse) {
        this.userResponse = this.localStorageService.getUserByLogin();
      }
    });
  }

  submitFormOneRegister(): void {
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.parseLocalStorage(constants.ID_REGISTER),
        lastTime: this.formOneRegister?.value?.lastTime,
      })
      .subscribe({
        next: (response: any) => {
          const lastTime = new Date(this.formOneRegister?.value?.lastTime);
          this.cycleServie
            .editCycle({
              dateBeging: lastTime.setDate(lastTime.getDate() - 5),
              id: this.localStorageService.parseLocalStorage(
                constants.ID_FIRST_CYCLE
              ),
              idUser: this.localStorageService.getUserByLogin()?.idUser,
              status: '',
            })
            .subscribe((res) => res);
          this.firstCycleEnd['initCycle'] = new Date(
            this.formOneRegister?.value?.lastTime
          );
        },
        error: (error) => error,
      });
  }

  submitFormTwoRegister(): void {
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.parseLocalStorage(constants.ID_REGISTER),
        lastCycleDuration: this.formTwoRegister?.value?.lastCycleDuration,
      })
      .subscribe({
        next: (response: any) => {},
        error: (error) => error,
      });
    this.firstCycleEnd['cycleDuration'] =
      this.formTwoRegister?.value?.lastCycleDuration;
  }

  submitFormThreeRegister(): void {
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.parseLocalStorage(constants.ID_REGISTER),
        regularCycleDuration:
          this.formThreeRegister?.value?.regularCycleDuration,
      })
      .subscribe({
        next: (response: any) => response,
        error: (error) => error,
      });
    this.firstCycleEnd['regularCycle'] =
      this.formThreeRegister?.value?.regularCycleDuration;
  }

  submitFormFourRegister(): void {
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.parseLocalStorage(constants.ID_REGISTER),
        regular: this.formFourRegister?.value.regular === '1' ? true : false,
      })
      .subscribe({
        next: (response: any) => response,
        error: (error) => error,
      });
  }

  submitFormFiveRegister(): void {
    //TODO: eliminar register id y cycleid del local storage
    this.firstCycleEnd['dayOfBleding'] =
      this.formFiveRegister?.value?.bleedingDuration;
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.parseLocalStorage(constants.ID_REGISTER),
        bleedingDuration: this.formFiveRegister?.value?.bleedingDuration,
      })
      .subscribe({
        next: (response: any) => {
          this.cycleServie
            .editCycle({
              id: this.localStorageService.parseLocalStorage(
                constants.ID_FIRST_CYCLE
              ),
              dateBeging: this.calculateBegingCycle(
                this.firstCycleEnd?.initCycle,
                this.formFiveRegister?.value?.bleedingDuration
              ),
              daysOfBleeding: this.formFiveRegister?.value?.bleedingDuration,
              idUser: this.localStorageService.getUserByLogin()?.idUser,
              status: '',
            })
            .subscribe((res) => res);
        },
        error: (error) => error,
      });
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

  redirection(): void {
    this.router.navigate(['']);
  }

  calculateEndCycle(data: FisrtCycle): Date | undefined {
    const averageCycle = (data?.cycleDuration + data?.regularCycle) / 2;
    let result: Date = new Date(data?.initCycle);
    result?.setDate(
      result?.getDate() + Math.round(averageCycle) - data?.dayOfBleding
    );
    return result;
  }

  calculateBegingCycle(
    initCycle: Date | any,
    dayOfBleding: number
  ): Date | undefined {
    let result: Date = new Date(initCycle);
    result?.setDate(result?.getDate() + dayOfBleding);
    return result;
  }
}
