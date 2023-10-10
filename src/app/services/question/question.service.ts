import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, of } from 'rxjs';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { AppState } from 'src/app/redux/store/app.store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  usersUrl: string = environment.apiUrlLocal + '/questionsUserMenstruation';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  createUserMenstruationQuestion(
    event: QuestionUserMenstruation
  ): Observable<any> {
    console.log(event)
    return this.http.post<any>(`${this.usersUrl}/createQuestion`, event).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
