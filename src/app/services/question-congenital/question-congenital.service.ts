import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/store/app.store';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { QuestionUserCongenital } from 'src/app/models/question.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionCongenitalService {
  usersUrl: string = environment.apiUrlLocal + '/congenitalCauses';
  userId: number | any = this.localStorageService.getUserByLogin()?.idUser;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  createUserCongenitalQuestion(event: QuestionUserCongenital): Observable<any> {
    return this.http
      .post<any>(`${this.usersUrl}/createCongenitalCause`, event)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // updateUserMenopauseQuestion(event: QuestionUserMenopause): Observable<any> {
  //   return this.http.put<any>(`${this.usersUrl}/updateQuestion`, event).pipe(
  //     map((response) => {
  //       return response;
  //     })
  //   );
  // }
}
