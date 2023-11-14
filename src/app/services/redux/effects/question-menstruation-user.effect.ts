import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { UserResponse } from 'src/app/models/user.model';
import { cycleUserInit } from '../actions/cycle/cycle-user.page.action';
import {
  loadCycleUserError,
  loadCyclesUserSuccess,
} from '../actions/cycle/cycle-user-api.action';
import { QuestionService } from '../../question/question.service';
import { questionUserMenstruationInit } from '../actions/question-menstruation/question-menstruation-user-page.action';
import {
  loadQuestionUserMenstruationError,
  loadQuestionUserMenstruationSuccess,
} from '../actions/question-menstruation/question-menstruation-user-api.action';

@Injectable()
export class QuestionMenstruationUserEffects {
  idUser: number | any = this.localStorageService.getUserByLogin()?.idUser;
  userResponse: UserResponse | any = this.localStorageService.getUserByLogin();

  loadQuestionMenstruationUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(questionUserMenstruationInit),
      exhaustMap(() =>
        this.questionMenstruationService
          .getQuestionUserMenstruationByIdUser(this.idUser)
          .pipe(
            map((questionUserMenstruation: any) =>
              loadQuestionUserMenstruationSuccess({
                questionUserMenstruation: questionUserMenstruation,
              })
            ),
            catchError(() =>
              of(
                loadQuestionUserMenstruationError({
                  errorMsg: 'Error al cargar questionario del usuario',
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private questionMenstruationService: QuestionService,
    private localStorageService: LocalStorageService
  ) {}
}
