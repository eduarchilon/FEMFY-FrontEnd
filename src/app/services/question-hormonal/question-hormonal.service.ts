import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/store/app.store';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { QuestionUserHormonal } from 'src/app/models/question.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionHormonalService {
  usersUrl: string = environment.apiUrlLocal + '/hormonalCauses';
  userId: number | any = this.localStorageService.getUserByLogin()?.idUser;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  createUserHormonalQuestion(event: QuestionUserHormonal): Observable<any> {
    return this.http
      .post<any>(`${this.usersUrl}/createHormonalCause`, event)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  updateUserHormonalQuestion(event: QuestionUserHormonal): Observable<any> {
    return this.http
      .put<any>(`${this.usersUrl}/updateHormonalCause`, event)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getQuestionUserHormonalByIdUser(idUser: number | any): Observable<any> {
    return this.http.get<any[]>(
      `${this.usersUrl}/getQuestionsByUser/${idUser}`
    );
  }
}
