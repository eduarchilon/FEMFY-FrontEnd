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

@Injectable()
export class CycleUserEffects {
  idUser: number | any = this.localStorageService.getUserByLogin()?.idUser;
  userResponse: UserResponse | any = this.localStorageService.getUserByLogin();

  loadCycleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cycleUserInit),
      exhaustMap(() =>
        this.cycleService.getAllCycles(this.idUser).pipe(
          map((cycles: any) => loadCyclesUserSuccess({ cyclesUser: cycles })),
          catchError(() =>
            of(
              loadCycleUserError({
                errorMsg: 'Error al cargar ciclos en el usuario',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cycleService: CicleService,
    private localStorageService: LocalStorageService
  ) {}
}
