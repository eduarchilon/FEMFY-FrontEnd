import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, switchMap } from 'rxjs';
import { UserRequest, UserResponse } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { constants } from 'src/app/constans/constants';
import { Store } from '@ngrx/store';
import { setUserLogin } from 'src/app/services/redux/actions/login.action';
import { AppState } from 'src/app/services/redux/store/app.store';
import { Router } from '@angular/router';
import { QuestionsUserFamilyHistory } from 'src/app/models/historial.model';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private isLoggingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLogging$ = this.isLoggingSubject.asObservable();
  isLoggin: boolean = false;

  usersUrl: string = environment.apiUrlLocal + '/questionsUserFamilyHistory';
  _userFinded = new BehaviorSubject<any>(null);
  user!: any; // cambiar a usuario

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getUserId(): string {
    return sessionStorage['userId'];
  }

  createQuestion(event: QuestionsUserFamilyHistory): Observable<any> {
    // console.log(event);
    return this.http.post<any>(`${this.usersUrl}/createQuestion`, event).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateUserHistoryQuestion(
    event: QuestionsUserFamilyHistory
  ): Observable<any> {
    return this.http.put<any>(`${this.usersUrl}/updateQuestion`, event).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getAllQuestionUserHistory(): Observable<any> {
    return this.http.get<any[]>(`${this.usersUrl}/getAllQuestions`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getAllQuestionUserHistoryById(idRegister: number | any): Observable<any> {
    return this.http.get<any[]>(`${this.usersUrl}/${idRegister}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getQuestionUserHistoryByIdHistory(idRegister: number | any): Observable<any> {
    return this.http.get<any[]>(`${this.usersUrl}/${idRegister}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getQuestionUserHistoryByIdUser(idUser: number | any): Observable<any> {
    return this.http
      .get<any[]>(`${this.usersUrl}/getQuestionsByUser/${idUser}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
