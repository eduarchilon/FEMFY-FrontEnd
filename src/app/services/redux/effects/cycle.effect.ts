import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { loadCycles } from '../actions/cycle.action';

@Injectable()
export class CycleEffects {
  idUser: number | any = this.localStorageService.getUserByLogin()?.idUser;

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCycles),
      exhaustMap(() =>
        this.cycleService.getAllCycles(this.idUser).pipe(
          map((cycles: any) => ({
            type: '[Cycle] get cycle success',
            payload: cycles,
          })),
          catchError(() => EMPTY)
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
