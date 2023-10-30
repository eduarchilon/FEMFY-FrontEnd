import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../redux/store/app.store';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { QuestionUserMenopause } from 'src/app/models/question.model';
import { Observable, map } from 'rxjs';
import { constants } from 'src/app/constans/constants';

@Injectable({
  providedIn: 'root',
})
export class QuestionMenopausicaService {
  usersUrl: string = environment.apiUrlLocal + '/questionsUserMenopause';
  userId: number | any = this.localStorageService.getUserByLogin()?.idUser;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  createUserMenopauseQuestion(event: QuestionUserMenopause): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/createQuestion`, event).pipe(
      map((response) => {
        this.localStorageService.setKeyValueLocalStorage(
          constants.USER,
          JSON.stringify({
            ...this.localStorageService.getUserByLogin(),
            idMenopause: response.id,
          })
        );
        return response;
      })
    );
  }

  updateUserMenopauseQuestion(event: QuestionUserMenopause): Observable<any> {
    return this.http.put<any>(`${this.usersUrl}/updateQuestion`, event).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
