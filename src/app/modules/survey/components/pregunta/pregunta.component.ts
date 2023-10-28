import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/services/redux/store/app.store';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { SurveyComponent } from '../../survey.component';
import { CicleService } from 'src/app/services/cicle/cicle.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss'],
})
export class PreguntaComponent implements OnInit {

  indicePreguntaActual: number = 0;

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

  // firstCycleEnd: any = {
  //   initCycle: '',
  //   cycleDuration: '',
  //   regularCycle: '',
  //   dayOfBleding: '',
  // };

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private questionsService: QuestionService,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {}

  submitFormOneRegister(): void {
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.getUserByLogin()?.idQuestion,
        lastTime: this.formOneRegister?.value?.lastTime,
      })
      .subscribe({
        next: (response: any) => {
          return response;
        },
        error: (error) => error,
      });
  }

  submitFormTwoRegister(): void {
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.getUserByLogin()?.idQuestion,
        lastCycleDuration: this.formTwoRegister?.value?.lastCycleDuration,
      })
      .subscribe({
        next: (response: any) => response,
        error: (error) => error,
      });
  }

  submitFormThreeRegister(): void {
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.getUserByLogin()?.idQuestion,
        regularCycleDuration:
          this.formThreeRegister?.value?.regularCycleDuration,
      })
      .subscribe({
        next: (response: any) => response,
        error: (error) => error,
      });
  }

  submitFormFourRegister(): void {
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.getUserByLogin()?.idQuestion,
        regular: this.formFourRegister?.value.regular === '1' ? true : false,
      })
      .subscribe({
        next: (response: any) => response,
        error: (error) => error,
      });
  }

  submitFormFiveRegister(): void {
    this.questionsService
      .updateUserMenstruationQuestion({
        id: this.localStorageService.getUserByLogin()?.idQuestion,
        bleedingDuration: this.formFiveRegister?.value?.bleedingDuration,
      })
      .subscribe({
        next: (response: any) => response,
        error: (error) => error,
      });
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

  redirection(): void {
    this.router.navigate(['']);
  }

  // calculateEndCycle(data: FisrtCycle): Date | undefined {
  //   const averageCycle = (data?.cycleDuration + data?.regularCycle) / 2;
  //   let result: Date = new Date(data?.initCycle);
  //   result?.setDate(
  //     result?.getDate() + Math.round(averageCycle) - data?.dayOfBleding
  //   );
  //   return result;
  // }

  // calculateBegingCycle(
  //   initCycle: Date | any,
  //   dayOfBleding: number
  // ): Date | undefined {
  //   let result: Date = new Date(initCycle);
  //   result?.setDate(result?.getDate() + dayOfBleding);
  //   return result;
  // }
}
