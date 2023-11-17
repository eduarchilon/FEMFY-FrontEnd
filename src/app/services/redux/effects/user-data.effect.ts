import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, concatMap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import {
  editUserData,
  userDataInit,
} from '../actions/user/user-data-page.action';
import { UserService } from '../../user/user.service';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import {
  editUserDataError,
  editUserDataSuccess,
  loadUserDataError,
  loadUserDataSuccess,
} from '../actions/user/user-data-api.action';
import { UserResponse } from 'src/app/models/user.model';

@Injectable()
export class UserDataEffects {
  idUser: number | any = this.localStorageService.getUserByLogin()?.idUser;
  userResponse: UserResponse | any = this.localStorageService.getUserByLogin();

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDataInit),
      exhaustMap(() =>
        this.userService.getUserById(this.idUser).pipe(
          map((userData: UserResponse | any) =>
            loadUserDataSuccess({ userData: userData })
          ),
          catchError(() =>
            of(loadUserDataError({ errorMsg: 'No hay usuario en la app' }))
          )
        )
      )
    )
  );

  editUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserData),
      concatMap((action) =>
        this.authService.updateUser(action.userData).pipe(
          map(() => editUserDataSuccess()),
          catchError(() =>
            of(
              editUserDataError({
                userData: action.userData,
                errorMsg: 'Erro al editar usuario',
              })
            )
          )
        )
      )
    )
  );
}
