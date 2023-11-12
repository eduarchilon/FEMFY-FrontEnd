import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { userDataInit } from '../actions/user/user-data-page.action';
import { UserService } from '../../user/user.service';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { loadUserDataSuccess } from '../actions/user/user-data-api.action';
import { UserResponse } from 'src/app/models/user.model';

@Injectable()
export class UserDataEffects {
  idUser: number | any = this.localStorageService.getUserByLogin()?.idUser;

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
          catchError(() => EMPTY)
        )
      )
    )
  );
}
