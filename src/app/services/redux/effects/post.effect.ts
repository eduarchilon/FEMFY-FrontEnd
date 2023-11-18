import { Injectable, OnInit } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { UserResponse } from 'src/app/models/user.model';
import { loadCyclesUserSuccess } from '../actions/cycle/cycle-user-api.action';
import { postInit } from '../actions/post/post.page.action';
import {
  loadPostError,
  loadPostSuccess,
} from '../actions/post/post.api.action';
import { PostService } from '../../post/post.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class PostEffects {
  idUser: number | any = this.localStorageService.getUserByLogin()?.idUser;
  userResponse: UserResponse | any = this.localStorageService.getUserByLogin();
  idPost: number = Number(this.localStorageService.getLocalStorage('idTopic'));

  loadPostUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postInit),
      map(() => Number(this.localStorageService.getLocalStorage('idTopic'))),
      exhaustMap((idTopic) =>
        this.postService.getAllPostsByTopic(idTopic).pipe(
          map((posts: any) => loadPostSuccess({ replay: posts })),
          catchError(() =>
            of(
              loadPostError({
                errorMsg: 'Error al cargar posts en el usuario',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {}
}
