import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AppState } from '../redux/store/app.store';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecomendationService {
  usersUrl: string = environment.apiUrlLocal + '/recommendations';
  userId: number | any = this.localStorageService.getUserByLogin()?.idUser;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  getRecommendationsByIdUsing(idUser: number | any): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${idUser}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
